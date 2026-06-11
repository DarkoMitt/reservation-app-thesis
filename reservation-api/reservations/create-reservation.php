<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";
require_once "../helpers/create-notification.php";
require_once "../helpers/update-no-show-prediction.php";

function normalizeTime($timeValue) {
    $timeValue = trim($timeValue);

    if (preg_match('/^\d{2}:\d{2}$/', $timeValue)) {
        return $timeValue . ":00";
    }

    if (preg_match('/^\d{2}:\d{2}:\d{2}$/', $timeValue)) {
        return $timeValue;
    }

    return null;
}

function parseWorkingHours($workingHours) {
    if (!$workingHours) return null;

    $workingHours = trim($workingHours);
    $lowerHours = strtolower($workingHours);

    if (stripos($workingHours, "closed") !== false) return null;

    if (
        $lowerHours === "24/7" ||
        $lowerHours === "24h" ||
        $lowerHours === "24 hours" ||
        $workingHours === "00:00 - 00:00" ||
        $workingHours === "00:00-00:00"
    ) {
        return [
            "start" => "00:00:00",
            "end" => "23:59:00",
            "is_24_7" => true
        ];
    }

    $parts = preg_split('/\s*-\s*/', $workingHours);

    if (count($parts) !== 2) return null;

    $start = normalizeTime($parts[0]);
    $end = normalizeTime($parts[1]);

    if (!$start || !$end) return null;

    return [
        "start" => $start,
        "end" => $end,
        "is_24_7" => false
    ];
}

function isWeekendDate($date) {
    $dayNumber = (int)date("N", strtotime($date));
    return $dayNumber >= 5;
}

function calculateNoShowRisk($trustScore, $noShowCount) {
    $trustScore = (int)$trustScore;
    $noShowCount = (int)$noShowCount;

    if ($trustScore <= 25 || $noShowCount >= 3) return "high";
    if ($trustScore <= 50 || $noShowCount >= 1) return "medium";

    return "low";
}

$data = json_decode(file_get_contents("php://input"), true);

$customerUserId = $data["customerUserId"] ?? null;
$restaurantId = $data["restaurantId"] ?? null;
$reservationDate = $data["reservationDate"] ?? null;
$reservationTime = $data["reservationTime"] ?? null;
$guestsCount = $data["guestsCount"] ?? null;
$specialRequest = trim($data["specialRequest"] ?? "");

if (!$customerUserId || !$restaurantId || !$reservationDate || !$reservationTime || !$guestsCount) {
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields."
    ]);
    exit;
}

try {
    $guestsCount = (int)$guestsCount;

    if ($guestsCount <= 0) {
        echo json_encode([
            "success" => false,
            "message" => "Guests count must be greater than 0."
        ]);
        exit;
    }

    $reservationTime = normalizeTime($reservationTime);

    if (!$reservationTime) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid reservation time format."
        ]);
        exit;
    }

    $customerStmt = $pdo->prepare("
        SELECT id, first_name, last_name, status, trust_score, no_show_count
        FROM users
        WHERE id = ?
        AND role = 'customer'
        LIMIT 1
    ");

    $customerStmt->execute([$customerUserId]);
    $customer = $customerStmt->fetch(PDO::FETCH_ASSOC);

    if (!$customer) {
        echo json_encode([
            "success" => false,
            "message" => "Customer not found."
        ]);
        exit;
    }

    if ($customer["status"] === "banned") {
        echo json_encode([
            "success" => false,
            "message" => "Your account has been banned after receiving 5 no-show reports from restaurants."
        ]);
        exit;
    }

    $limitStmt = $pdo->prepare("
        SELECT COUNT(*) AS reservation_count
        FROM reservations
        WHERE customer_user_id = ?
        AND created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
    ");

    $limitStmt->execute([$customerUserId]);
    $limitData = $limitStmt->fetch(PDO::FETCH_ASSOC);

    if ((int)$limitData["reservation_count"] >= 3) {
        echo json_encode([
            "success" => false,
            "message" => "You have reached the reservation limit. Please try again in 1 hour."
        ]);
        exit;
    }

    $dailyLimitStmt = $pdo->prepare("
        SELECT COUNT(*) AS daily_count
        FROM reservations
        WHERE customer_user_id = ?
        AND reservation_date = ?
        AND status IN ('pending', 'approved', 'change_requested', 'waitlisted')
    ");

    $dailyLimitStmt->execute([
        $customerUserId,
        $reservationDate
    ]);

    $dailyLimitData = $dailyLimitStmt->fetch(PDO::FETCH_ASSOC);

    if ((int)$dailyLimitData["daily_count"] >= 2) {
        echo json_encode([
            "success" => false,
            "message" => "You already have 2 reservations for this day. This is the daily limit."
        ]);
        exit;
    }

    $timeConflictStmt = $pdo->prepare("
        SELECT
            reservations.reservation_time,
            restaurants.restaurant_name
        FROM reservations
        INNER JOIN restaurants
            ON restaurants.id = reservations.restaurant_id
        WHERE reservations.customer_user_id = ?
        AND reservations.reservation_date = ?
        AND reservations.status IN ('pending', 'approved', 'change_requested', 'waitlisted')
        AND ABS(TIME_TO_SEC(TIMEDIFF(reservations.reservation_time, ?))) < 10800
        LIMIT 1
    ");

    $timeConflictStmt->execute([
        $customerUserId,
        $reservationDate,
        $reservationTime
    ]);

    $conflictReservation = $timeConflictStmt->fetch(PDO::FETCH_ASSOC);

    if ($conflictReservation) {
        echo json_encode([
            "success" => false,
            "message" => "You already have another reservation at " .
                substr($conflictReservation["reservation_time"], 0, 5) .
                " in " .
                $conflictReservation["restaurant_name"] .
                ". Reservations must be at least 3 hours apart."
        ]);
        exit;
    }

    $customerTrustScore = (int)$customer["trust_score"];
    $customerNoShowCount = (int)$customer["no_show_count"];
    $noShowRisk = calculateNoShowRisk($customerTrustScore, $customerNoShowCount);

    $duplicateStmt = $pdo->prepare("
        SELECT id
        FROM reservations
        WHERE customer_user_id = ?
        AND restaurant_id = ?
        AND status IN ('pending', 'approved', 'change_requested', 'waitlisted')
        AND CONCAT(reservation_date, ' ', reservation_time) > NOW()
        LIMIT 1
    ");

    $duplicateStmt->execute([
        $customerUserId,
        $restaurantId
    ]);

    if ($duplicateStmt->fetch(PDO::FETCH_ASSOC)) {
        echo json_encode([
            "success" => false,
            "message" => "You already have an active or waitlisted reservation for this restaurant."
        ]);
        exit;
    }

    $restaurantStmt = $pdo->prepare("
        SELECT
            id,
            user_id,
            restaurant_name,
            max_guests,
            working_hours,
            mon_thu_hours,
            fri_sun_hours
        FROM restaurants
        WHERE id = ?
        LIMIT 1
    ");

    $restaurantStmt->execute([$restaurantId]);
    $restaurant = $restaurantStmt->fetch(PDO::FETCH_ASSOC);

    if (!$restaurant) {
        echo json_encode([
            "success" => false,
            "message" => "Restaurant not found."
        ]);
        exit;
    }

    $selectedWorkingHours = $restaurant["working_hours"];

    if (isWeekendDate($reservationDate) && !empty($restaurant["fri_sun_hours"])) {
        $selectedWorkingHours = $restaurant["fri_sun_hours"];
    }

    if (!isWeekendDate($reservationDate) && !empty($restaurant["mon_thu_hours"])) {
        $selectedWorkingHours = $restaurant["mon_thu_hours"];
    }

    $hours = parseWorkingHours($selectedWorkingHours);

    if (!$hours) {
        echo json_encode([
            "success" => false,
            "message" => "Restaurant is closed on the selected date."
        ]);
        exit;
    }

    if (!empty($hours["is_24_7"])) {
        $reservationDateTime = strtotime($reservationDate . " " . $reservationTime);
        $allowedStartDateTime = strtotime($reservationDate . " 00:00:00");
        $allowedEndDateTime = strtotime($reservationDate . " 23:59:00");
    } else {
        $openDateTime = strtotime($reservationDate . " " . $hours["start"]);
        $closeDateTime = strtotime($reservationDate . " " . $hours["end"]);
        $reservationDateTime = strtotime($reservationDate . " " . $reservationTime);

        if ($closeDateTime <= $openDateTime) {
            $closeDateTime = strtotime("+1 day", $closeDateTime);

            if ($reservationDateTime < $openDateTime) {
                $reservationDateTime = strtotime("+1 day", $reservationDateTime);
            }
        }

        $allowedStartDateTime = strtotime("+2 hours", $openDateTime);
        $allowedEndDateTime = strtotime("-2 hours", $closeDateTime);
    }

    if ($reservationDateTime < $allowedStartDateTime || $reservationDateTime > $allowedEndDateTime) {
        echo json_encode([
            "success" => false,
            "message" => "Reservations are allowed only from " .
                date("H:i", $allowedStartDateTime) .
                " to " .
                date("H:i", $allowedEndDateTime) .
                " for this restaurant."
        ]);
        exit;
    }

    $maxGuests = (int)$restaurant["max_guests"];

    $capacityStmt = $pdo->prepare("
        SELECT COALESCE(SUM(guests_count), 0) AS reserved_guests
        FROM reservations
        WHERE restaurant_id = ?
        AND reservation_date = ?
        AND status IN ('approved', 'pending', 'change_requested')
        AND reservation_time < ADDTIME(?, '03:00:00')
        AND ADDTIME(reservation_time, '03:00:00') > ?
    ");

    $capacityStmt->execute([
        $restaurantId,
        $reservationDate,
        $reservationTime,
        $reservationTime
    ]);

    $capacityData = $capacityStmt->fetch(PDO::FETCH_ASSOC);
    $reservedGuests = (int)$capacityData["reserved_guests"];
    $availableGuests = max(0, $maxGuests - $reservedGuests);

    $status = $guestsCount > $availableGuests ? "waitlisted" : "pending";

    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        INSERT INTO reservations (
            customer_user_id,
            restaurant_id,
            reservation_date,
            reservation_time,
            guests_count,
            special_request,
            status,
            trust_score,
            no_show_risk
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $customerUserId,
        $restaurantId,
        $reservationDate,
        $reservationTime,
        $guestsCount,
        $specialRequest,
        $status,
        $customerTrustScore,
        $noShowRisk
    ]);

    $reservationId = (int)$pdo->lastInsertId();

    updateNoShowPrediction($pdo, $reservationId);

    $customerFullName = trim($customer["first_name"] . " " . $customer["last_name"]);
    $shortTime = substr($reservationTime, 0, 5);

    if ($status === "pending") {
        createNotification(
            $pdo,
            (int)$restaurant["user_id"],
            "restaurant",
            "New Reservation Request",
            $customerFullName . " requested a table for " . $guestsCount . " guests on " . $reservationDate . " at " . $shortTime . ".",
            "new_reservation_request",
            $reservationId,
            (int)$restaurantId
        );

        $message = "Reservation request sent successfully.";
    } else {
        createNotification(
            $pdo,
            (int)$customerUserId,
            "customer",
            "Added to Waitlist",
            $restaurant["restaurant_name"] . " is full for " . $reservationDate . " at " . $shortTime . ". Your request was added to the waitlist.",
            "reservation_waitlisted",
            $reservationId,
            (int)$restaurantId
        );

        createNotification(
            $pdo,
            (int)$restaurant["user_id"],
            "restaurant",
            "New Waitlist Request",
            $customerFullName . " requested a waitlist spot for " . $guestsCount . " guests on " . $reservationDate . " at " . $shortTime . ".",
            "new_waitlist_request",
            $reservationId,
            (int)$restaurantId
        );

        $message = "Restaurant is full for this time slot. Your request has been added to the waitlist.";
    }

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "status" => $status,
        "availableGuests" => $availableGuests,
        "message" => $message
    ]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}