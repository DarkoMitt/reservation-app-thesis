<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$data = json_decode(file_get_contents("php://input"), true);

$restaurantId = $data["restaurantId"] ?? null;
$imageBase64 = $data["imageBase64"] ?? null;
$fileName = $data["fileName"] ?? "menu.jpg";
$imageType = $data["imageType"] ?? "image/jpeg";

if (!$restaurantId || !$imageBase64) {
    echo json_encode([
        "success" => false,
        "message" => "Restaurant ID and image are required."
    ]);
    exit;
}

$allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

if (!in_array($imageType, $allowedTypes)) {
    echo json_encode([
        "success" => false,
        "message" => "Only JPG and PNG images are allowed."
    ]);
    exit;
}

$extension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

if (!$extension) {
    $extension = $imageType === "image/png" ? "png" : "jpg";
}

$uploadDir = "../uploads/menus/";

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$cleanFileName = "menu_" . $restaurantId . "_" . time() . "_" . rand(1000, 9999) . "." . $extension;
$targetPath = $uploadDir . $cleanFileName;

$imageData = base64_decode($imageBase64);

if ($imageData === false) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid image data."
    ]);
    exit;
}

if (file_put_contents($targetPath, $imageData) === false) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to save image."
    ]);
    exit;
}

$imageUrl = "http://10.0.2.2/reservation-api/uploads/menus/" . $cleanFileName;

echo json_encode([
    "success" => true,
    "imageUrl" => $imageUrl
]);