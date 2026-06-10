<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");

require_once "../config/database.php";

try {
    $stmt = $pdo->prepare("
        SELECT
            id,
            first_name,
            last_name,
            phone,
            email,
            role,
            status,
            trust_score,
            no_show_count,
            created_at
        FROM users
        ORDER BY created_at DESC
    ");

    $stmt->execute();

    echo json_encode([
        "success" => true,
        "users" => $stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}