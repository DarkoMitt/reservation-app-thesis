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
        SELECT
            id,
            user_id,
            reservation_id,
            change_value,
            old_score,
            new_score,
            reason,
            created_at
        FROM trust_score_history
        WHERE user_id = ?
        ORDER BY created_at DESC
        LIMIT 10
    ");

    $stmt->execute([$userId]);

    echo json_encode([
        "success" => true,
        "history" => $stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}