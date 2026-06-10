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
        UPDATE users
            SET
                status = 'banned',
                ban_reason = 'admin_ban'
            WHERE id = ?
    ");

    $stmt->execute([$userId]);

    $restaurantStmt = $pdo->prepare("
        UPDATE restaurants
        SET status = 'banned'
        WHERE user_id = ?
    ");

    $restaurantStmt->execute([$userId]);

    echo json_encode([
        "success" => true,
        "message" => "User banned successfully."
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}