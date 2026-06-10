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
    $stmt = $pdo->prepare("
        SELECT user_id
        FROM restaurants
        WHERE id = ?
        LIMIT 1
    ");

    $stmt->execute([$restaurantId]);
    $restaurant = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$restaurant) {
        echo json_encode([
            "success" => false,
            "message" => "Restaurant not found."
        ]);
        exit;
    }

    $pdo->beginTransaction();

    $deleteRestaurant = $pdo->prepare("
        DELETE FROM restaurants
        WHERE id = ?
    ");

    $deleteRestaurant->execute([$restaurantId]);

    $deleteUser = $pdo->prepare("
        DELETE FROM users
        WHERE id = ?
    ");

    $deleteUser->execute([$restaurant["user_id"]]);

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Restaurant deleted successfully."
    ]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}