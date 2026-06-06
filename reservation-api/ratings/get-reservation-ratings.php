<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$reservationId = $data["reservationId"] ?? null;

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
            reservation_id,
            reviewer_user_id,
            target_user_id,
            restaurant_id,
            rating_type,
            overall_rating,
            food_rating,
            service_rating,
            atmosphere_rating,
            review_text,
            price_per_person,
            created_at
        FROM ratings
        WHERE reservation_id = ?
    ");

    $stmt->execute([$reservationId]);

    $ratings = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $customerToRestaurant = null;
    $restaurantToCustomer = null;

    foreach ($ratings as $rating) {
        if ($rating["rating_type"] === "customer_to_restaurant") {
            $customerToRestaurant = $rating;
        }

        if ($rating["rating_type"] === "restaurant_to_customer") {
            $restaurantToCustomer = $rating;
        }
    }

    echo json_encode([
        "success" => true,
        "customerToRestaurant" => $customerToRestaurant,
        "restaurantToCustomer" => $restaurantToCustomer
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}