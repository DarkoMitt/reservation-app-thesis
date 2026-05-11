<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$restaurantId = $data["restaurantId"] ?? null;
$reason = trim($data["reason"] ?? "");

if (!$restaurantId || empty($reason)) {
    echo json_encode([
        "success" => false,
        "message" => "Restaurant ID and rejection reason are required."
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
        SET status = 'rejected',
            rejection_reason = ?
        WHERE id = ?
    ");
    $updateRestaurant->execute([$reason, $restaurantId]);

    $updateUser = $pdo->prepare("
        UPDATE users
        SET status = 'rejected'
        WHERE id = ?
    ");
    $updateUser->execute([$restaurant["user_id"]]);

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Restaurant rejected successfully."
    ]);
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    echo json_encode([
        "success" => false,
        "message" => "Failed to reject restaurant."
    ]);
}