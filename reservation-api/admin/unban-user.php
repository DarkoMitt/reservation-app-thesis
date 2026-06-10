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
        SET status = 'active'
        WHERE id = ?
    ");

    $stmt->execute([$userId]);

    $restaurantStmt = $pdo->prepare("
        UPDATE restaurants
        SET status = 'approved'
        WHERE user_id = ?
        AND status = 'banned'
    ");

    $restaurantStmt->execute([$userId]);

    echo json_encode([
        "success" => true,
        "message" => "User unbanned successfully."
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}