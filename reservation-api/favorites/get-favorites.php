<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once "../config/database.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

$data = json_decode(file_get_contents("php://input"), true);

$customerUserId = (int)($data["customerUserId"] ?? 0);

if ($customerUserId <= 0) {
    echo json_encode(["success" => false, "message" => "Missing customer user id."]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT restaurant_id
        FROM favorite_restaurants
        WHERE customer_user_id = ?
    ");
    $stmt->execute([$customerUserId]);

    echo json_encode([
        "success" => true,
        "favoriteRestaurantIds" => array_map('intval', $stmt->fetchAll(PDO::FETCH_COLUMN))
    ]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}