<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

require_once "../config/database.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Use POST request."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$userId = (int)($data["userId"] ?? 0);
$phone = trim($data["phone"] ?? "");

if ($userId <= 0 || empty($phone)) {
    echo json_encode([
        "success" => false,
        "message" => "User data is missing."
    ]);
    exit;
}

try {
    $checkUser = $pdo->prepare("
        SELECT id, phone_verified
        FROM users
        WHERE id = ?
          AND phone = ?
          AND role = 'customer'
        LIMIT 1
    ");

    $checkUser->execute([$userId, $phone]);
    $user = $checkUser->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode([
            "success" => false,
            "message" => "Customer not found."
        ]);
        exit;
    }

    if ((int)$user["phone_verified"] === 1) {
        echo json_encode([
            "success" => false,
            "message" => "Phone number is already verified."
        ]);
        exit;
    }

    $verificationCode = (string) random_int(100000, 999999);

    $pdo->beginTransaction();

    $expireOldCodes = $pdo->prepare("
        UPDATE phone_verifications
        SET is_used = 1
        WHERE user_id = ?
          AND is_used = 0
    ");
    $expireOldCodes->execute([$userId]);

    $insertCode = $pdo->prepare("
        INSERT INTO phone_verifications
        (user_id, phone, code, expires_at, is_used)
        VALUES
        (?, ?, ?, DATE_ADD(NOW(), INTERVAL 1 MINUTE), 0)
    ");

    $insertCode->execute([
        $userId,
        $phone,
        $verificationCode
    ]);

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "New verification code generated.",
        "demoCode" => $verificationCode
    ]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}