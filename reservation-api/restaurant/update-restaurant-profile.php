<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$restaurantId = $data["restaurantId"] ?? null;

if (!$restaurantId) {
    echo json_encode([
        "success" => false,
        "message" => "Restaurant ID is required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        UPDATE restaurants
        SET
            cuisine_type = ?,
            address = ?,
            city = ?,
            phone = ?,
            description = ?,
            max_guests = ?,
            working_hours = ?,
            has_smoking_area = ?,
            has_outdoor_seating = ?,
            has_parking = ?,
            has_wifi = ?,
            restaurant_image = ?,
            menu_image = ?
        WHERE id = ?
    ");

    $stmt->execute([
        trim($data["cuisineType"] ?? ""),
        trim($data["address"] ?? ""),
        trim($data["city"] ?? ""),
        trim($data["phone"] ?? ""),
        trim($data["description"] ?? ""),
        (int)($data["maxGuests"] ?? 0),
        trim($data["workingHours"] ?? ""),
        (int)($data["hasSmokingArea"] ?? 0),
        (int)($data["hasOutdoorSeating"] ?? 0),
        (int)($data["hasParking"] ?? 0),
        (int)($data["hasWifi"] ?? 0),
        trim($data["restaurantImage"] ?? ""),
        trim($data["menuImage"] ?? ""),
        $restaurantId
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Restaurant profile updated successfully."
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to update restaurant profile."
    ]);
}