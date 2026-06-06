<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";
require_once "../helpers/create-notification.php";
require_once "../helpers/create-trust-history.php";
require_once "../helpers/process-waitlist.php";

$data = json_decode(file_get_contents("php://input"), true);

$reservationId = $data["reservationId"] ?? null;
$status = $data["status"] ?? null;

$rejectionReason = trim($data["rejectionReason"] ?? "");

$suggestedDate = $data["suggestedDate"] ?? null;
$suggestedTime = $data["suggestedTime"] ?? null;
$suggestedGuestsCount = $data["suggestedGuestsCount"] ?? null;
$changeReason = trim($data["changeReason"] ?? "");

$allowedStatuses = [
    "pending",
    "approved",
    "rejected",
    "change_requested",
    "cancelled",
    "visited",
    "no_show"
];

if (!$reservationId || !$status || !in_array($status, $allowedStatuses)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid reservation data."
    ]);
    exit;
}

if ($status === "rejected" && $rejectionReason === "") {
    echo json_encode([
        "success" => false,
        "message" => "Rejection reason is required."
    ]);
    exit;
}

if ($status === "change_requested") {
    if (!$suggestedDate || !$suggestedTime || !$suggestedGuestsCount || $changeReason === "") {
        echo json_encode([
            "success" => false,
            "message" => "Suggested date, time, guests count and reason are required."
        ]);
        exit;
    }

    if ((int)$suggestedGuestsCount <= 0) {
        echo json_encode([
            "success" => false,
            "message" => "Suggested guests count must be greater than 0."
        ]);
        exit;
    }
}

try {
    $pdo->beginTransaction();

    $reservationStmt = $pdo->prepare("
        SELECT
            reservations.id,
            reservations.customer_user_id,
            reservations.restaurant_id,
            reservations.reservation_date,
            reservations.reservation_time,
            reservations.guests_count,
            reservations.status,

            restaurants.restaurant_name,
            restaurants.user_id AS restaurant_user_id,

            users.first_name,
            users.last_name
        FROM reservations
        INNER JOIN restaurants
            ON restaurants.id = reservations.restaurant_id
        INNER JOIN users
            ON users.id = reservations.customer_user_id
        WHERE reservations.id = ?
        LIMIT 1
    ");

    $reservationStmt->execute([$reservationId]);
    $reservation = $reservationStmt->fetch(PDO::FETCH_ASSOC);

    if (!$reservation) {
        $pdo->rollBack();

        echo json_encode([
            "success" => false,
            "message" => "Reservation not found."
        ]);
        exit;
    }

    $customerUserId = (int)$reservation["customer_user_id"];
    $restaurantId = (int)$reservation["restaurant_id"];
    $restaurantName = $reservation["restaurant_name"];
    $reservationDate = $reservation["reservation_date"];
    $reservationTimeRaw = $reservation["reservation_time"];
    $reservationTime = substr($reservationTimeRaw, 0, 5);
    $guestsCount = (int)$reservation["guests_count"];

    if ($status === "rejected") {
        $stmt = $pdo->prepare("
            UPDATE reservations
            SET
                status = ?,
                rejection_reason = ?,
                suggested_date = NULL,
                suggested_time = NULL,
                suggested_guests_count = NULL,
                change_reason = NULL,
                change_expires_at = NULL
            WHERE id = ?
        ");

        $stmt->execute([
            $status,
            $rejectionReason,
            $reservationId
        ]);

        createNotification(
            $pdo,
            $customerUserId,
            "customer",
            "Reservation Rejected",
            $restaurantName . " rejected your reservation for " . $reservationDate . " at " . $reservationTime . ". Reason: " . $rejectionReason,
            "reservation_rejected",
            (int)$reservationId,
            $restaurantId
        );

        processWaitlist(
            $pdo,
            $restaurantId,
            $reservationDate,
            $reservationTimeRaw
        );

    } elseif ($status === "change_requested") {
        $stmt = $pdo->prepare("
            UPDATE reservations
            SET
                status = ?,
                suggested_date = ?,
                suggested_time = ?,
                suggested_guests_count = ?,
                change_reason = ?,
                change_expires_at = DATE_ADD(NOW(), INTERVAL 1 HOUR),
                rejection_reason = NULL
            WHERE id = ?
        ");

        $stmt->execute([
            $status,
            $suggestedDate,
            $suggestedTime,
            (int)$suggestedGuestsCount,
            $changeReason,
            $reservationId
        ]);

        createNotification(
            $pdo,
            $customerUserId,
            "customer",
            "Reservation Change Suggested",
            $restaurantName . " suggested changes for your reservation. New date: " . $suggestedDate . ", time: " . substr($suggestedTime, 0, 5) . ", guests: " . (int)$suggestedGuestsCount . ".",
            "reservation_change_requested",
            (int)$reservationId,
            $restaurantId
        );

    } elseif ($status === "visited") {
        $stmt = $pdo->prepare("
            UPDATE reservations
            SET
                status = 'visited',
                rejection_reason = NULL,
                suggested_date = NULL,
                suggested_time = NULL,
                suggested_guests_count = NULL,
                change_reason = NULL,
                change_expires_at = NULL
            WHERE id = ?
        ");

        $stmt->execute([$reservationId]);

        $userScoreStmt = $pdo->prepare("
            SELECT trust_score
            FROM users
            WHERE id = ?
            LIMIT 1
        ");

        $userScoreStmt->execute([$customerUserId]);
        $oldScore = (int)$userScoreStmt->fetchColumn();
        $newScore = min($oldScore + 3, 100);

        $trustStmt = $pdo->prepare("
            UPDATE users
            SET trust_score = ?
            WHERE id = ?
        ");

        $trustStmt->execute([
            $newScore,
            $customerUserId
        ]);

        createTrustHistory(
            $pdo,
            $customerUserId,
            (int)$reservationId,
            3,
            $oldScore,
            $newScore,
            "Visit confirmed"
        );

        createNotification(
            $pdo,
            $customerUserId,
            "customer",
            "Visit Confirmed",
            $restaurantName . " marked your reservation as visited. Your trust score increased by 3 points.",
            "reservation_visited",
            (int)$reservationId,
            $restaurantId
        );

    } elseif ($status === "no_show") {
        $stmt = $pdo->prepare("
            UPDATE reservations
            SET
                status = 'no_show',
                rejection_reason = NULL,
                suggested_date = NULL,
                suggested_time = NULL,
                suggested_guests_count = NULL,
                change_reason = NULL,
                change_expires_at = NULL
            WHERE id = ?
        ");

        $stmt->execute([$reservationId]);

        $userScoreStmt = $pdo->prepare("
            SELECT trust_score
            FROM users
            WHERE id = ?
            LIMIT 1
        ");

        $userScoreStmt->execute([$customerUserId]);
        $oldScore = (int)$userScoreStmt->fetchColumn();
        $newScore = max(0, $oldScore - 10);

        $trustStmt = $pdo->prepare("
            UPDATE users
            SET
                trust_score = ?,
                no_show_count = no_show_count + 1,
                status = CASE
                    WHEN no_show_count + 1 >= 5 THEN 'banned'
                    ELSE status
                END
            WHERE id = ?
        ");

        $trustStmt->execute([
            $newScore,
            $customerUserId
        ]);

        createTrustHistory(
            $pdo,
            $customerUserId,
            (int)$reservationId,
            -10,
            $oldScore,
            $newScore,
            "No-show recorded"
        );

        createNotification(
            $pdo,
            $customerUserId,
            "customer",
            "No-show Recorded",
            $restaurantName . " marked your reservation as no-show. Your trust score decreased by 10 points.",
            "reservation_no_show",
            (int)$reservationId,
            $restaurantId
        );

        processWaitlist(
            $pdo,
            $restaurantId,
            $reservationDate,
            $reservationTimeRaw
        );

    } elseif ($status === "approved") {
        $stmt = $pdo->prepare("
            UPDATE reservations
            SET
                status = 'approved',
                rejection_reason = NULL,
                suggested_date = NULL,
                suggested_time = NULL,
                suggested_guests_count = NULL,
                change_reason = NULL,
                change_expires_at = NULL
            WHERE id = ?
        ");

        $stmt->execute([$reservationId]);

        createNotification(
            $pdo,
            $customerUserId,
            "customer",
            "Reservation Approved",
            $restaurantName . " approved your reservation for " . $reservationDate . " at " . $reservationTime . " for " . $guestsCount . " guests.",
            "reservation_approved",
            (int)$reservationId,
            $restaurantId
        );

    } else {
        $stmt = $pdo->prepare("
            UPDATE reservations
            SET
                status = ?,
                rejection_reason = NULL,
                suggested_date = NULL,
                suggested_time = NULL,
                suggested_guests_count = NULL,
                change_reason = NULL,
                change_expires_at = NULL
            WHERE id = ?
        ");

        $stmt->execute([
            $status,
            $reservationId
        ]);
    }

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Reservation status updated successfully."
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