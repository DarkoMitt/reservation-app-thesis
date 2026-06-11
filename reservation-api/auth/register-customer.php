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

$firstName = trim($data["firstName"] ?? "");
$lastName = trim($data["lastName"] ?? "");
$country = trim($data["country"] ?? "");
$city = trim($data["city"] ?? "");
$phone = trim($data["phone"] ?? "");
$email = trim($data["email"] ?? "");
$birthDate = trim($data["birthDate"] ?? "");
$preferences = trim($data["preferences"] ?? "No preferences");
$password = $data["password"] ?? "";

if (
    empty($firstName) || empty($lastName) || empty($country) ||
    empty($city) || empty($phone) || empty($email) ||
    empty($birthDate) || empty($password)
) {
    echo json_encode(["success" => false, "message" => "All required fields must be filled."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Please enter a valid email address."]);
    exit;
}

try {
    $birth = new DateTime($birthDate);
    $today = new DateTime();
    $age = $today->diff($birth)->y;

    if ($age < 13 || $age > 100) {
        echo json_encode(["success" => false, "message" => "Please enter a valid birth date."]);
        exit;
    }

    if (strlen($password) < 6) {
        echo json_encode(["success" => false, "message" => "Password must be at least 6 characters long."]);
        exit;
    }

    $checkUser = $pdo->prepare("
        SELECT id, status
        FROM users
        WHERE email = ? OR phone = ?
        LIMIT 1
    ");
    $checkUser->execute([$email, $phone]);
    $existingUser = $checkUser->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        if ($existingUser["status"] === "banned") {
            echo json_encode([
                "success" => false,
                "message" => "This phone number or email is blocked because the previous account was banned after repeated no-shows."
            ]);
            exit;
        }

        echo json_encode(["success" => false, "message" => "User with this email or phone already exists."]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $verificationCode = (string) random_int(100000, 999999);

    $pdo->beginTransaction();

    $insertUser = $pdo->prepare("
        INSERT INTO users
        (first_name, last_name, phone, email, password, role, status, phone_verified, trust_score, no_show_count)
        VALUES
        (?, ?, ?, ?, ?, 'customer', 'active', 0, 40, 0)
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
        (user_id, country, city, birth_date, age, preferences)
        VALUES
        (?, ?, ?, ?, ?, ?)
    ");

    $insertProfile->execute([
        $userId,
        $country,
        $city,
        $birthDate,
        $age,
        $preferences
    ]);

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
        "message" => "Customer account created. Please verify your phone number.",
        "userId" => (int)$userId,
        "phone" => $phone,
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