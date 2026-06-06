<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data["email"] ?? "");
$code = trim($data["code"] ?? "");
$newPassword = $data["newPassword"] ?? "";

if (!$email || !$code || !$newPassword) {
    echo json_encode([
        "success" => false,
        "message" => "Email, code and new password are required."
    ]);
    exit;
}

if (strlen($newPassword) < 6) {
    echo json_encode([
        "success" => false,
        "message" => "Password must be at least 6 characters."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT
            password_reset_codes.id,
            password_reset_codes.user_id
        FROM password_reset_codes
        INNER JOIN users
            ON users.id = password_reset_codes.user_id
        WHERE password_reset_codes.email = ?
        AND password_reset_codes.code = ?
        AND password_reset_codes.is_used = 0
        AND password_reset_codes.expires_at >= NOW()
        ORDER BY password_reset_codes.created_at DESC
        LIMIT 1
    ");

    $stmt->execute([$email, $code]);
    $resetCode = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$resetCode) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid or expired verification code."
        ]);
        exit;
    }

    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    $pdo->beginTransaction();

    $updatePasswordStmt = $pdo->prepare("
        UPDATE users
        SET password = ?
        WHERE id = ?
    ");

    $updatePasswordStmt->execute([
        $hashedPassword,
        $resetCode["user_id"]
    ]);

    $markUsedStmt = $pdo->prepare("
        UPDATE password_reset_codes
        SET is_used = 1
        WHERE id = ?
    ");

    $markUsedStmt->execute([$resetCode["id"]]);

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Password reset successfully."
    ]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}