<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");

require_once "../config/database.php";

try {
    $stmt = $pdo->prepare("
        SELECT
            restaurants.id AS restaurant_id,
            restaurants.user_id,
            restaurants.restaurant_name,
            restaurants.restaurant_type,
            restaurants.cuisine_type,
            restaurants.city,
            restaurants.address,
            restaurants.phone,
            restaurants.status,
            restaurants.rejection_reason,
            restaurants.created_at,
            users.email,
            users.status AS user_status
        FROM restaurants
        INNER JOIN users
            ON restaurants.user_id = users.id
        ORDER BY restaurants.created_at DESC
    ");

    $stmt->execute();

    echo json_encode([
        "success" => true,
        "restaurants" => $stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}