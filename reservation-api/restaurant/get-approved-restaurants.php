<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");

require_once "../config/database.php";

try {
    $stmt = $pdo->prepare("
        SELECT
            restaurants.id,
            restaurants.restaurant_name,
            restaurants.restaurant_type,
            restaurants.cuisine_type,
            restaurants.city,
            restaurants.address,
            restaurants.phone,
            restaurants.description,
            restaurants.max_guests,
            restaurants.working_hours,
            restaurants.mon_thu_hours,
            restaurants.fri_sun_hours,
            restaurants.has_smoking_area,
            restaurants.has_outdoor_seating,
            restaurants.has_parking,
            restaurants.has_wifi,
            restaurants.restaurant_image,
            restaurants.menu_image,
            restaurants.restaurant_images,
            restaurants.menu_images,
            restaurants.status,
            users.email
        FROM restaurants
        INNER JOIN users
            ON restaurants.user_id = users.id
        WHERE restaurants.status = 'approved'
        ORDER BY restaurants.restaurant_name ASC
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