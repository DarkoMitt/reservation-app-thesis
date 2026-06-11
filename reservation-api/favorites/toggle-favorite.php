<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once "../config/database.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

$data = json_decode(file_get_contents("php://input"), true);

$customerUserId = (int)($data["customerUserId"] ?? 0);
$restaurantId = (int)($data["restaurantId"] ?? 0);

if ($customerUserId <= 0 || $restaurantId <= 0) {
    echo json_encode(["success" => false, "message" => "Missing data."]);
    exit;
}

try {
    $check = $pdo->prepare("
        SELECT id FROM favorite_restaurants
        WHERE customer_user_id = ? AND restaurant_id = ?
        LIMIT 1
    ");
    $check->execute([$customerUserId, $restaurantId]);
    $favorite = $check->fetch(PDO::FETCH_ASSOC);

    if ($favorite) {
        $delete = $pdo->prepare("DELETE FROM favorite_restaurants WHERE id = ?");
        $delete->execute([$favorite["id"]]);

        echo json_encode([
            "success" => true,
            "isFavorite" => false,
            "message" => "Removed from favorites."
        ]);
        exit;
    }

    $insert = $pdo->prepare("
        INSERT INTO favorite_restaurants (customer_user_id, restaurant_id)
        VALUES (?, ?)
    ");
    $insert->execute([$customerUserId, $restaurantId]);

    echo json_encode([
        "success" => true,
        "isFavorite" => true,
        "message" => "Added to favorites."
    ]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}