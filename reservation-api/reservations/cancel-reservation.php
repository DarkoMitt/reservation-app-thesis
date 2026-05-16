<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

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
            id,
            reservation_date,
            reservation_time,
            status
        FROM reservations
        WHERE id = ?
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

    if (!in_array($reservation["status"], ["pending", "approved", "change_requested"])) {
        echo json_encode([
            "success" => false,
            "message" => "This reservation can no longer be cancelled."
        ]);
        exit;
    }

    $reservationDateTime = strtotime(
        $reservation["reservation_date"] . " " . $reservation["reservation_time"]
    );

    $fiveHoursBefore = $reservationDateTime - (5 * 60 * 60);

    if (time() > $fiveHoursBefore) {
        echo json_encode([
            "success" => false,
            "message" => "Reservations can only be cancelled at least 5 hours before the reservation time."
        ]);
        exit;
    }

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

    echo json_encode([
        "success" => true,
        "message" => "Reservation cancelled successfully."
    ]);

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}