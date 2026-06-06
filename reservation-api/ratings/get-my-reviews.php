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
            ratings.id,
            ratings.reservation_id,
            ratings.overall_rating,
            ratings.food_rating,
            ratings.service_rating,
            ratings.atmosphere_rating,
            ratings.review_text,
            ratings.price_per_person,
            ratings.created_at,

            restaurants.id AS restaurant_id,
            restaurants.restaurant_name,
            restaurants.city,
            restaurants.address
        FROM ratings
        INNER JOIN restaurants
            ON restaurants.id = ratings.restaurant_id
        WHERE ratings.reviewer_user_id = ?
        AND ratings.rating_type = 'customer_to_restaurant'
        ORDER BY ratings.created_at DESC
    ");

    $stmt->execute([$userId]);

    echo json_encode([
        "success" => true,
        "reviews" => $stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}