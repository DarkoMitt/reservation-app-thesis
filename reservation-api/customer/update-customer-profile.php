<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$userId = $data["userId"] ?? null;
$email = trim($data["email"] ?? "");
$preferences = trim($data["preferences"] ?? "");

if (!$userId || empty($email)) {
    echo json_encode([
        "success" => false,
        "message" => "User ID and email are required."
    ]);
    exit;
}

try {
    $checkEmail = $pdo->prepare("
        SELECT id
        FROM users
        WHERE email = ?
        AND id != ?
        LIMIT 1
    ");

    $checkEmail->execute([$email, $userId]);

    if ($checkEmail->fetch()) {
        echo json_encode([
            "success" => false,
            "message" => "This email is already used by another account."
        ]);
        exit;
    }

    $pdo->beginTransaction();

    $updateUser = $pdo->prepare("
        UPDATE users
        SET email = ?
        WHERE id = ?
        AND role = 'customer'
    ");

    $updateUser->execute([$email, $userId]);

    $updateProfile = $pdo->prepare("
        UPDATE customer_profiles
        SET preferences = ?
        WHERE user_id = ?
    ");

    $updateProfile->execute([$preferences, $userId]);

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Profile updated successfully."
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