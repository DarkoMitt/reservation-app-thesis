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
        SELECT id, status, no_show_count
        FROM users
        WHERE id = ?
        LIMIT 1
    ");

    $stmt->execute([$userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode([
            "success" => false,
            "message" => "User not found."
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "status" => $user["status"],
        "no_show_count" => (int)$user["no_show_count"]
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to check user status."
    ]);
}