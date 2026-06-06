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

function calculateAgeFromBirthDate($birthDate) {
    $date = DateTime::createFromFormat("m/d/Y", $birthDate);

    if (!$date) {
        return null;
    }

    $today = new DateTime();
    return $today->diff($date)->y;
}

$data = json_decode(file_get_contents("php://input"), true);

$firstName = trim($data["firstName"] ?? "");
$lastName = trim($data["lastName"] ?? "");
$country = trim($data["country"] ?? "North Macedonia");
$city = trim($data["city"] ?? "");
$phone = trim($data["phone"] ?? "");
$email = trim($data["email"] ?? "");
$birthDate = trim($data["birthDate"] ?? "");
$preferences = trim($data["preferences"] ?? "");
$password = $data["password"] ?? "";

if (
    empty($firstName) ||
    empty($lastName) ||
    empty($country) ||
    empty($city) ||
    empty($phone) ||
    empty($email) ||
    empty($birthDate) ||
    empty($password)
) {
    echo json_encode([
        "success" => false,
        "message" => "All required fields must be filled."
    ]);
    exit;
}

$age = calculateAgeFromBirthDate($birthDate);

if ($age === null) {
    echo json_encode([
        "success" => false,
        "message" => "Birth date must be in MM/DD/YYYY format."
    ]);
    exit;
}

if ($age < 13) {
    echo json_encode([
        "success" => false,
        "message" => "You must be at least 13 years old to create an account."
    ]);
    exit;
}

try {
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
        (first_name, last_name, phone, email, password, role, status, trust_score, no_show_count)
        VALUES (?, ?, ?, ?, ?, 'customer', 'active', 40, 0)
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
        $age,
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