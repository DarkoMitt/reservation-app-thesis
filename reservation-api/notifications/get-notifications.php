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
            role,
            title,
            message,
            notification_type,
            related_reservation_id,
            related_restaurant_id,
            is_read,
            created_at
        FROM notifications
        WHERE user_id = ?
        ORDER BY created_at DESC
    ");

    $stmt->execute([$userId]);

    $countStmt = $pdo->prepare("
        SELECT COUNT(*) AS unread_count
        FROM notifications
        WHERE user_id = ?
        AND is_read = 0
    ");

    $countStmt->execute([$userId]);
    $countData = $countStmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "unread_count" => (int)$countData["unread_count"],
        "notifications" => $stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}