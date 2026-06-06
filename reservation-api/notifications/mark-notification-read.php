<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$notificationId = $data["notificationId"] ?? null;
$userId = $data["userId"] ?? null;

if (!$notificationId || !$userId) {
    echo json_encode([
        "success" => false,
        "message" => "Notification ID and User ID are required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        UPDATE notifications
        SET is_read = 1
        WHERE id = ?
        AND user_id = ?
    ");

    $stmt->execute([
        $notificationId,
        $userId
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Notification marked as read."
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}