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
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("SELECT user_id FROM restaurants WHERE id = ?");
    $stmt->execute([$restaurantId]);
    $restaurant = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$restaurant) {
        throw new Exception("Restaurant not found.");
    }

    $updateRestaurant = $pdo->prepare("
        UPDATE restaurants
        SET status = 'approved',
            rejection_reason = NULL
        WHERE id = ?
    ");
    $updateRestaurant->execute([$restaurantId]);

    $updateUser = $pdo->prepare("
        UPDATE users
        SET status = 'active'
        WHERE id = ?
    ");
    $updateUser->execute([$restaurant["user_id"]]);

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Restaurant approved successfully."
    ]);
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    echo json_encode([
        "success" => false,
        "message" => "Failed to approve restaurant."
    ]);
}