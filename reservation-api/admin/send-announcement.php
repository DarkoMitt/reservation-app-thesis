<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$title = trim($data["title"] ?? "");
$message = trim($data["message"] ?? "");
$targetType = trim($data["targetType"] ?? "");
$targetUserId = $data["targetUserId"] ?? null;

if (empty($title) || empty($message) || empty($targetType)) {
    echo json_encode([
        "success" => false,
        "message" => "Title, message and target type are required."
    ]);
    exit;
}

try {
    if ($targetType === "specific_user" && !$targetUserId) {
        echo json_encode([
            "success" => false,
            "message" => "Target user is required."
        ]);
        exit;
    }

    if ($targetType === "specific_restaurant" && !$targetUserId) {
        echo json_encode([
            "success" => false,
            "message" => "Target restaurant is required."
        ]);
        exit;
    }

    $users = [];

    if ($targetType === "all_users") {
        $stmt = $pdo->prepare("
            SELECT id, role
            FROM users
            WHERE status = 'active'
        ");
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    if ($targetType === "all_customers") {
        $stmt = $pdo->prepare("
            SELECT id, role
            FROM users
            WHERE role = 'customer'
            AND status = 'active'
        ");
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    if ($targetType === "all_restaurants") {
        $stmt = $pdo->prepare("
            SELECT id, role
            FROM users
            WHERE role = 'restaurant'
            AND status = 'active'
        ");
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    if ($targetType === "specific_user" || $targetType === "specific_restaurant") {
        $stmt = $pdo->prepare("
            SELECT id, role
            FROM users
            WHERE id = ?
            LIMIT 1
        ");
        $stmt->execute([$targetUserId]);
        $selectedUser = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$selectedUser) {
            echo json_encode([
                "success" => false,
                "message" => "Selected user not found."
            ]);
            exit;
        }

        $users = [$selectedUser];
    }

    if (count($users) === 0) {
        echo json_encode([
            "success" => false,
            "message" => "No active recipients found."
        ]);
        exit;
    }

    $pdo->beginTransaction();

    $insert = $pdo->prepare("
        INSERT INTO notifications
        (
            user_id,
            role,
            title,
            message,
            notification_type,
            related_reservation_id,
            related_restaurant_id,
            is_read
        )
        VALUES (?, ?, ?, ?, 'announcement', NULL, NULL, 0)
    ");

    foreach ($users as $user) {
        $insert->execute([
            $user["id"],
            $user["role"],
            $title,
            $message
        ]);
    }

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Announcement sent successfully.",
        "sent_count" => count($users)
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