<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$customerUserId = $data["customerUserId"] ?? null;
$restaurantId = $data["restaurantId"] ?? null;
$reservationDate = $data["reservationDate"] ?? null;
$reservationTime = $data["reservationTime"] ?? null;
$guestsCount = $data["guestsCount"] ?? null;
$specialRequest = trim($data["specialRequest"] ?? "");

if (
    !$customerUserId ||
    !$restaurantId ||
    !$reservationDate ||
    !$reservationTime ||
    !$guestsCount
) {
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

    $duplicateStmt = $pdo->prepare("
        SELECT id
        FROM reservations
        WHERE customer_user_id = ?
        AND restaurant_id = ?
        AND status IN ('approved', 'change_requested')
        AND CONCAT(reservation_date, ' ', reservation_time) > NOW()
        LIMIT 1
    ");

    $duplicateStmt->execute([
        $customerUserId,
        $restaurantId
    ]);

    $existingReservation = $duplicateStmt->fetch(PDO::FETCH_ASSOC);

    if ($existingReservation) {
        echo json_encode([
            "success" => false,
            "message" => "You already have an active reservation for this restaurant."
        ]);
        exit;
    }

    $restaurantStmt = $pdo->prepare("
        SELECT max_guests
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

    if ($guestsCount > $availableGuests) {
        echo json_encode([
            "success" => false,
            "message" => "Only " . $availableGuests . " seats are available for this time slot."
        ]);
        exit;
    }

    $status = "pending";
    $trustScore = 100;
    $noShowRisk = "low";

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
        $trustScore,
        $noShowRisk
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Reservation request sent successfully."
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}