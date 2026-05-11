<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

require_once "../config/database.php";

try {
    $stmt = $pdo->prepare("
        SELECT 
            restaurants.id AS restaurant_id,
            restaurants.user_id,
            restaurants.restaurant_name,
            restaurants.restaurant_type,
            restaurants.cuisine_type,
            restaurants.address,
            restaurants.city,
            restaurants.phone,
            restaurants.description,
            restaurants.max_guests,
            restaurants.working_hours,
            restaurants.status,
            users.email,
            users.created_at
        FROM restaurants
        INNER JOIN users ON restaurants.user_id = users.id
        WHERE restaurants.status = 'pending'
        ORDER BY restaurants.created_at DESC
    ");

    $stmt->execute();
    $restaurants = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "restaurants" => $restaurants
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch pending restaurants."
    ]);
}