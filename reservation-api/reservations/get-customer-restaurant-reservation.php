<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$cleanupStmt = $pdo->prepare("
    UPDATE reservations
    SET
        status = 'rejected',
        rejection_reason = 'The suggested change expired because the customer did not respond within 1 hour.',
        suggested_date = NULL,
        suggested_time = NULL,
        suggested_guests_count = NULL,
        change_reason = NULL,
        change_expires_at = NULL
    WHERE status = 'change_requested'
    AND change_expires_at < NOW()
");

$cleanupStmt->execute();

$data = json_decode(file_get_contents("php://input"), true);

$customerUserId = $data["customerUserId"] ?? null;
$restaurantId = $data["restaurantId"] ?? null;

if (!$customerUserId || !$restaurantId) {
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields."
    ]);
    exit;
}

try {
    $activeStmt = $pdo->prepare("
        SELECT
            id,
            reservation_date,
            reservation_time,
            guests_count,
            status,
            no_show_risk,
            trust_score,
            special_request,
            rejection_reason,
            suggested_date,
            suggested_time,
            suggested_guests_count,
            change_reason,
            change_expires_at,
            created_at
        FROM reservations
        WHERE customer_user_id = ?
        AND restaurant_id = ?
        AND (
            (
                status IN ('pending', 'approved')
                AND CONCAT(reservation_date, ' ', reservation_time) > NOW()
            )
            OR
            (
                status = 'change_requested'
                AND change_expires_at > NOW()
            )
        )
        ORDER BY created_at DESC
        LIMIT 1
    ");

    $activeStmt->execute([
        $customerUserId,
        $restaurantId
    ]);

    $activeReservation = $activeStmt->fetch(PDO::FETCH_ASSOC);

    $lastRejectedStmt = $pdo->prepare("
        SELECT
            id,
            reservation_date,
            reservation_time,
            guests_count,
            status,
            no_show_risk,
            trust_score,
            special_request,
            rejection_reason,
            created_at
        FROM reservations
        WHERE customer_user_id = ?
        AND restaurant_id = ?
        AND status = 'rejected'
        ORDER BY updated_at DESC, created_at DESC
        LIMIT 1
    ");

    $lastRejectedStmt->execute([
        $customerUserId,
        $restaurantId
    ]);

    $lastRejectedReservation = $lastRejectedStmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "activeReservation" => $activeReservation ?: null,
        "lastRejectedReservation" => $lastRejectedReservation ?: null
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}