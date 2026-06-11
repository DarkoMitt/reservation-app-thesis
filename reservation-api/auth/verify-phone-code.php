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
$code = trim($data["code"] ?? "");

if ($userId <= 0 || empty($code)) {
    echo json_encode([
        "success" => false,
        "message" => "Verification code is required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT id
        FROM phone_verifications
        WHERE user_id = ?
          AND code = ?
          AND is_used = 0
          AND expires_at >= NOW()
        ORDER BY id DESC
        LIMIT 1
    ");

    $stmt->execute([$userId, $code]);
    $verification = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$verification) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid or expired verification code."
        ]);
        exit;
    }

    $pdo->beginTransaction();

    $markCodeUsed = $pdo->prepare("
        UPDATE phone_verifications
        SET is_used = 1
        WHERE id = ?
    ");
    $markCodeUsed->execute([$verification["id"]]);

    $verifyUser = $pdo->prepare("
        UPDATE users
        SET phone_verified = 1
        WHERE id = ?
          AND role = 'customer'
    ");
    $verifyUser->execute([$userId]);

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Phone number verified successfully."
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