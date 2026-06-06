<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Use POST request."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$restaurantName = trim($data["restaurantName"] ?? "");
$restaurantType = trim($data["restaurantType"] ?? "");
$cuisineType = trim($data["cuisineType"] ?? "");
$city = trim($data["city"] ?? "");
$address = trim($data["address"] ?? "");
$phone = trim($data["phone"] ?? "");
$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";
$description = trim($data["description"] ?? "");
$maxGuests = trim($data["maxGuests"] ?? "");
$workingHours = trim($data["workingHours"] ?? "");
$businessRegistrationNumber = trim($data["businessRegistrationNumber"] ?? "");

if (
    empty($restaurantName) ||
    empty($restaurantType) ||
    empty($city) ||
    empty($address) ||
    empty($phone) ||
    empty($email) ||
    empty($password)
) {
    echo json_encode([
        "success" => false,
        "message" => "All required fields must be filled."
    ]);
    exit;
}

try {
    $checkUser = $pdo->prepare("
        SELECT id FROM users 
        WHERE (email = ? OR phone = ?)
        AND status != 'rejected'
    ");

    $checkUser->execute([$email, $phone]);

    if ($checkUser->fetch()) {
        echo json_encode([
            "success" => false,
            "message" => "Restaurant with this email or phone already exists."
        ]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $pdo->beginTransaction();

    $insertUser = $pdo->prepare("
        INSERT INTO users
        (first_name, last_name, phone, email, password, role, status)
        VALUES (?, ?, ?, ?, ?, 'restaurant', 'pending')
    ");

    $insertUser->execute([
        $restaurantName,
        $restaurantType,
        $phone,
        $email,
        $hashedPassword
    ]);

    $userId = $pdo->lastInsertId();

    $insertRestaurant = $pdo->prepare("
        INSERT INTO restaurants
        (
            user_id,
            restaurant_name,
            restaurant_type,
            cuisine_type,
            address,
            city,
            phone,
            description,
            max_guests,
            working_hours,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    ");

    $insertRestaurant->execute([
        $userId,
        $restaurantName,
        $restaurantType,
        $cuisineType,
        $address,
        $city,
        $phone,
        $description,
        (int)$maxGuests,
        $workingHours
    ]);

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Restaurant registration submitted for approval."
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