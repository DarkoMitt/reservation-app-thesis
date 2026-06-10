<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Use POST request."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$emailOrPhone = trim($data["emailOrPhone"] ?? "");
$password = $data["password"] ?? "";

if (empty($emailOrPhone) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "Email/phone and password are required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT 
            users.id,
            users.first_name,
            users.last_name,
            users.phone,
            users.email,
            users.password,
            users.role,
            users.status,
            users.ban_reason,
            users.no_show_count,
            users.trust_score,
            restaurants.rejection_reason,
            customer_profiles.preferences
        FROM users
        LEFT JOIN restaurants 
            ON restaurants.user_id = users.id
        LEFT JOIN customer_profiles
            ON customer_profiles.user_id = users.id
        WHERE users.email = ? OR users.phone = ?
        LIMIT 1
    ");

    $stmt->execute([$emailOrPhone, $emailOrPhone]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user["password"])) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid email/phone or password."
        ]);
        exit;
    }

    if ($user["status"] === "banned") {
        $banReason = $user["ban_reason"] ?? null;

        if ($banReason === "admin_ban") {
            $message = "Your account has been banned by an administrator.";
        } elseif ($banReason === "automatic_no_show_ban") {
            $message = "Your account has been banned after receiving 5 no-show reports from restaurants.";
        } else {
            $message = "Your account has been banned.";
        }

        echo json_encode([
            "success" => false,
            "message" => $message
        ]);
        exit;
    }

    unset($user["password"]);

    echo json_encode([
        "success" => true,
        "message" => "Login successful.",
        "user" => $user
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Login failed."
    ]);
}