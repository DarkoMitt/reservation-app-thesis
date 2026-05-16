<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$customerUserId = $data["customerUserId"] ?? null;

if (!$customerUserId) {
    echo json_encode([
        "success" => false,
        "message" => "Customer ID is required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT
            reservations.id,
            reservations.restaurant_id,
            reservations.reservation_date,
            reservations.reservation_time,
            reservations.guests_count,
            reservations.status,
            reservations.special_request,
            reservations.rejection_reason,
            reservations.cancellation_reason,
            reservations.suggested_date,
            reservations.suggested_time,
            reservations.suggested_guests_count,
            reservations.change_reason,
            reservations.change_expires_at,
            restaurants.restaurant_name,
            restaurants.city,
            restaurants.address,
            restaurants.cuisine_type
        FROM reservations
        INNER JOIN restaurants
            ON reservations.restaurant_id = restaurants.id
        WHERE reservations.customer_user_id = ?
        ORDER BY reservations.reservation_date DESC, reservations.reservation_time DESC
    ");

    $stmt->execute([$customerUserId]);

    echo json_encode([
        "success" => true,
        "reservations" => $stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}