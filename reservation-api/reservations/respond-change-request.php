<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$reservationId = $data["reservationId"] ?? null;
$action = $data["action"] ?? null;

if (!$reservationId || !$action || !in_array($action, ["accept", "reject"])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request data."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT
            id,
            status,
            suggested_date,
            suggested_time,
            suggested_guests_count,
            change_expires_at
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

    if ($reservation["status"] !== "change_requested") {
        echo json_encode([
            "success" => false,
            "message" => "This reservation does not have a pending change offer."
        ]);
        exit;
    }

    if ($reservation["change_expires_at"] && strtotime($reservation["change_expires_at"]) < time()) {
        $expireStmt = $pdo->prepare("
            UPDATE reservations
            SET
                status = 'rejected',
                rejection_reason = 'The suggested change expired because the customer did not respond within 1 hour.',
                suggested_date = NULL,
                suggested_time = NULL,
                suggested_guests_count = NULL,
                change_reason = NULL,
                change_expires_at = NULL
            WHERE id = ?
        ");

        $expireStmt->execute([$reservationId]);

        echo json_encode([
            "success" => false,
            "message" => "This change offer has expired."
        ]);
        exit;
    }

    if ($action === "accept") {
        $acceptStmt = $pdo->prepare("
            UPDATE reservations
            SET
                reservation_date = suggested_date,
                reservation_time = suggested_time,
                guests_count = suggested_guests_count,
                status = 'approved',
                suggested_date = NULL,
                suggested_time = NULL,
                suggested_guests_count = NULL,
                change_reason = NULL,
                change_expires_at = NULL,
                rejection_reason = NULL
            WHERE id = ?
        ");

        $acceptStmt->execute([$reservationId]);

        echo json_encode([
            "success" => true,
            "message" => "Suggested changes accepted successfully."
        ]);
        exit;
    }

    $rejectStmt = $pdo->prepare("
        UPDATE reservations
        SET
            status = 'rejected',
            rejection_reason = 'Customer rejected the restaurant suggested changes.',
            suggested_date = NULL,
            suggested_time = NULL,
            suggested_guests_count = NULL,
            change_reason = NULL,
            change_expires_at = NULL
        WHERE id = ?
    ");

    $rejectStmt->execute([$reservationId]);

    echo json_encode([
        "success" => true,
        "message" => "Suggested changes rejected successfully."
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}