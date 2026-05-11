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
        restaurants.rejection_reason
    FROM users
    LEFT JOIN restaurants ON restaurants.user_id = users.id
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