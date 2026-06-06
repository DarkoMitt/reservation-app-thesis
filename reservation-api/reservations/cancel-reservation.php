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
$cancellationReason = trim($data["cancellationReason"] ?? "");

if (!$reservationId) {
    echo json_encode([
        "success" => false,
        "message" => "Reservation ID is required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT
            reservations.id,
            reservations.customer_user_id,
            reservations.restaurant_id,
            reservations.reservation_date,
            reservations.reservation_time,
            reservations.status,
            users.trust_score,
            users.first_name,
            users.last_name,
            restaurants.restaurant_name,
            restaurants.user_id AS restaurant_user_id
        FROM reservations
        INNER JOIN users
            ON users.id = reservations.customer_user_id
        INNER JOIN restaurants
            ON restaurants.id = reservations.restaurant_id
        WHERE reservations.id = ?
        LIMIT 1
    ");

    $stmt->execute([$reservationId]);
    $reservation = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$reservation) {
        echo json_encode([
            "success" => false,
            "message" => "Reservation not found."
        ]);
        exit;
    }

    if (!in_array($reservation["status"], ["pending", "approved", "change_requested", "waitlisted"])) {
        echo json_encode([
            "success" => false,
            "message" => "This reservation can no longer be cancelled."
        ]);
        exit;
    }

    $reservationDateTime = strtotime(
        $reservation["reservation_date"] . " " . $reservation["reservation_time"]
    );

    $secondsUntilReservation = $reservationDateTime - time();
    $hoursUntilReservation = $secondsUntilReservation / 3600;

    if ($hoursUntilReservation < 5) {
        echo json_encode([
            "success" => false,
            "message" => "Reservations can only be cancelled at least 5 hours before the reservation time."
        ]);
        exit;
    }

    $trustPenalty = 0;
    $historyReason = "";

    if ($hoursUntilReservation >= 5 && $hoursUntilReservation < 8) {
        $trustPenalty = 3;
        $historyReason = "Late cancellation (5-8 hours before reservation)";
    } elseif ($hoursUntilReservation >= 8 && $hoursUntilReservation < 12) {
        $trustPenalty = 2;
        $historyReason = "Cancellation (8-12 hours before reservation)";
    }

    $pdo->beginTransaction();

    $updateStmt = $pdo->prepare("
        UPDATE reservations
        SET
            status = 'cancelled',
            cancellation_reason = ?,
            suggested_date = NULL,
            suggested_time = NULL,
            suggested_guests_count = NULL,
            change_reason = NULL,
            change_expires_at = NULL
        WHERE id = ?
    ");

    $updateStmt->execute([
        $cancellationReason !== "" ? $cancellationReason : null,
        $reservationId
    ]);

    if ($trustPenalty > 0) {
        $oldScore = (int)$reservation["trust_score"];
        $newScore = max(0, $oldScore - $trustPenalty);

        $trustStmt = $pdo->prepare("
            UPDATE users
            SET trust_score = ?
            WHERE id = ?
        ");

        $trustStmt->execute([
            $newScore,
            $reservation["customer_user_id"]
        ]);

        createTrustHistory(
            $pdo,
            (int)$reservation["customer_user_id"],
            (int)$reservationId,
            -$trustPenalty,
            $oldScore,
            $newScore,
            $historyReason
        );
    }

    $customerFullName = trim(
        $reservation["first_name"] . " " . $reservation["last_name"]
    );

    createNotification(
        $pdo,
        (int)$reservation["restaurant_user_id"],
        "restaurant",
        "Reservation Cancelled",
        $customerFullName .
        " cancelled the reservation for " .
        $reservation["reservation_date"] .
        " at " .
        substr($reservation["reservation_time"], 0, 5) .
        ".",
        "reservation_cancelled_by_customer",
        (int)$reservationId,
        (int)$reservation["restaurant_id"]
    );

    processWaitlist(
        $pdo,
        (int)$reservation["restaurant_id"],
        $reservation["reservation_date"],
        $reservation["reservation_time"]
    );

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Reservation cancelled successfully.",
        "trustPenalty" => $trustPenalty
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