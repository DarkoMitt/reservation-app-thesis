<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

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
    $summaryStmt = $pdo->prepare("
        SELECT
            COUNT(*) AS total_reviews,

            COALESCE(
                ROUND(
                    AVG(
                        (
                            COALESCE(food_rating, 0) +
                            COALESCE(service_rating, 0) +
                            COALESCE(atmosphere_rating, 0)
                        ) / 3
                    ),
                    1
                ),
                0
            ) AS overall_rating,

            COALESCE(ROUND(AVG(food_rating), 1), 0) AS food_rating,
            COALESCE(ROUND(AVG(service_rating), 1), 0) AS service_rating,
            COALESCE(ROUND(AVG(atmosphere_rating), 1), 0) AS atmosphere_rating

        FROM ratings
        WHERE restaurant_id = ?
        AND rating_type = 'customer_to_restaurant'
    ");

    $summaryStmt->execute([$restaurantId]);
    $summary = $summaryStmt->fetch(PDO::FETCH_ASSOC);

    $priceStmt = $pdo->prepare("
        SELECT price_per_person, COUNT(*) AS votes
        FROM ratings
        WHERE restaurant_id = ?
        AND rating_type = 'customer_to_restaurant'
        AND price_per_person IS NOT NULL
        GROUP BY price_per_person
        ORDER BY votes DESC, price_per_person ASC
        LIMIT 1
    ");

    $priceStmt->execute([$restaurantId]);
    $price = $priceStmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "summary" => [
            "total_reviews" => (int)$summary["total_reviews"],
            "overall_rating" => (float)$summary["overall_rating"],
            "food_rating" => (float)$summary["food_rating"],
            "service_rating" => (float)$summary["service_rating"],
            "atmosphere_rating" => (float)$summary["atmosphere_rating"],
            "most_common_price_per_person" => $price ? (int)$price["price_per_person"] : null
        ]
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}