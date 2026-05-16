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

$restaurantId = $data["restaurantId"] ?? null;

if (!$restaurantId) {
    echo json_encode([
        "success" => false,
        "message" => "Restaurant ID is required."
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
            reservations.guests_count,
            reservations.status,
            reservations.no_show_risk,
            reservations.trust_score,
            reservations.special_request,
            reservations.created_at,
            CONCAT(users.first_name, ' ', users.last_name) AS full_name,
            users.email
        FROM reservations
        INNER JOIN users
            ON reservations.customer_user_id = users.id
        WHERE reservations.restaurant_id = ?
        ORDER BY reservations.created_at DESC
    ");

    $stmt->execute([$restaurantId]);

    echo json_encode([
        "success" => true,
        "requests" => $stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}