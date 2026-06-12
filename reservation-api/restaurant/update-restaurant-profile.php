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
    $mondayHours = trim($data["mondayHours"] ?? "");
    $tuesdayHours = trim($data["tuesdayHours"] ?? "");
    $wednesdayHours = trim($data["wednesdayHours"] ?? "");
    $thursdayHours = trim($data["thursdayHours"] ?? "");
    $fridayHours = trim($data["fridayHours"] ?? "");
    $saturdayHours = trim($data["saturdayHours"] ?? "");
    $sundayHours = trim($data["sundayHours"] ?? "");

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

            monday_hours = ?,
            tuesday_hours = ?,
            wednesday_hours = ?,
            thursday_hours = ?,
            friday_hours = ?,
            saturday_hours = ?,
            sunday_hours = ?,

            has_smoking_area = ?,
            has_outdoor_seating = ?,
            has_parking = ?,
            has_wifi = ?,
            restaurant_image = ?,
            menu_image = ?,
            restaurant_images = ?,
            menu_images = ?
        WHERE id = ?
    ");

    $stmt->execute([
        trim($data["cuisineType"] ?? ""),
        trim($data["address"] ?? ""),
        trim($data["city"] ?? ""),
        trim($data["phone"] ?? ""),
        trim($data["description"] ?? ""),
        (int)($data["maxGuests"] ?? 0),
        $mondayHours,

        $mondayHours,
        $tuesdayHours,
        $wednesdayHours,
        $thursdayHours,
        $fridayHours,
        $saturdayHours,
        $sundayHours,

        (int)($data["hasSmokingArea"] ?? 0),
        (int)($data["hasOutdoorSeating"] ?? 0),
        (int)($data["hasParking"] ?? 0),
        (int)($data["hasWifi"] ?? 0),
        trim($data["restaurantImage"] ?? ""),
        trim($data["menuImage"] ?? ""),
        $data["restaurantImages"] ?? "[]",
        $data["menuImages"] ?? "[]",
        $restaurantId
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Restaurant profile updated successfully."
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}