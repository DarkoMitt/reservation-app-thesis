<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data["email"] ?? "");

if (!$email) {
    echo json_encode(["success" => false, "message" => "Email is required."]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT id, email
        FROM users
        WHERE email = ?
        LIMIT 1
    ");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["success" => false, "message" => "No account found with this email."]);
        exit;
    }

    $code = str_pad((string)random_int(0, 999999), 6, "0", STR_PAD_LEFT);

    $pdo->prepare("
        UPDATE password_reset_codes
        SET is_used = 1
        WHERE user_id = ?
        AND is_used = 0
    ")->execute([$user["id"]]);

    $insertStmt = $pdo->prepare("
        INSERT INTO password_reset_codes (
            user_id,
            email,
            code,
            expires_at,
            is_used
        )
        VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 1 MINUTE), 0)
    ");

    $insertStmt->execute([
        $user["id"],
        $email,
        $code
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Verification code generated successfully.",
        "email" => $email,
        "demo_code" => $code
    ]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}