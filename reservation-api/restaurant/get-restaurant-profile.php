<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$userId = $data["userId"] ?? null;

if (!$userId) {
    echo json_encode([
        "success" => false,
        "message" => "User ID is required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT 
            restaurants.id AS restaurant_id,
            restaurants.restaurant_name,
            restaurants.restaurant_type,
            restaurants.cuisine_type,
            restaurants.address,
            restaurants.city,
            restaurants.phone,
            restaurants.description,
            restaurants.max_guests,
            restaurants.working_hours,

            restaurants.monday_hours,
            restaurants.tuesday_hours,
            restaurants.wednesday_hours,
            restaurants.thursday_hours,
            restaurants.friday_hours,
            restaurants.saturday_hours,
            restaurants.sunday_hours,

            restaurants.has_smoking_area,
            restaurants.has_outdoor_seating,
            restaurants.has_parking,
            restaurants.has_wifi,
            restaurants.restaurant_image,
            restaurants.menu_image,
            restaurants.restaurant_images,
            restaurants.menu_images,
            restaurants.status,
            restaurants.rejection_reason,
            users.email
        FROM restaurants
        INNER JOIN users 
            ON restaurants.user_id = users.id
        WHERE restaurants.user_id = ?
        LIMIT 1
    ");

    $stmt->execute([$userId]);
    $restaurant = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$restaurant) {
        echo json_encode([
            "success" => false,
            "message" => "Restaurant profile not found."
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "restaurant" => $restaurant
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}