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

$firstName = trim($data["firstName"] ?? "");
$lastName = trim($data["lastName"] ?? "");
$country = trim($data["country"] ?? "");
$city = trim($data["city"] ?? "");
$phone = trim($data["phone"] ?? "");
$email = trim($data["email"] ?? "");
$age = trim($data["age"] ?? "");
$preferences = trim($data["preferences"] ?? "");
$password = $data["password"] ?? "";

if (
    empty($firstName) ||
    empty($lastName) ||
    empty($country) ||
    empty($city) ||
    empty($phone) ||
    empty($email) ||
    empty($age) ||
    empty($password)
) {
    echo json_encode([
        "success" => false,
        "message" => "All required fields must be filled."
    ]);
    exit;
}

try {
    $checkUser = $pdo->prepare("SELECT id FROM users WHERE email = ? OR phone = ?");
    $checkUser->execute([$email, $phone]);

    if ($checkUser->fetch()) {
        echo json_encode([
            "success" => false,
            "message" => "User with this email or phone already exists."
        ]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $pdo->beginTransaction();

    $insertUser = $pdo->prepare("
        INSERT INTO users 
        (first_name, last_name, phone, email, password, role, status)
        VALUES (?, ?, ?, ?, ?, 'customer', 'active')
    ");

    $insertUser->execute([
        $firstName,
        $lastName,
        $phone,
        $email,
        $hashedPassword
    ]);

    $userId = $pdo->lastInsertId();

    $insertProfile = $pdo->prepare("
        INSERT INTO customer_profiles
        (user_id, country, city, age, preferences)
        VALUES (?, ?, ?, ?, ?)
    ");

    $insertProfile->execute([
        $userId,
        $country,
        $city,
        (int)$age,
        $preferences
    ]);

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Customer account created successfully."
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