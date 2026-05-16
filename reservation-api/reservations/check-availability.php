<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$restaurantId = $data["restaurantId"] ?? null;
$reservationDate = $data["reservationDate"] ?? null;
$reservationTime = $data["reservationTime"] ?? null;

$reservationDurationHours = 3;

if (!$restaurantId || !$reservationDate || !$reservationTime) {
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields."
    ]);
    exit;
}

try {
    $restaurantStmt = $pdo->prepare("
        SELECT max_guests
        FROM restaurants
        WHERE id = ?
        LIMIT 1
    ");

    $restaurantStmt->execute([$restaurantId]);
    $restaurant = $restaurantStmt->fetch(PDO::FETCH_ASSOC);

    if (!$restaurant) {
        echo json_encode([
            "success" => false,
            "message" => "Restaurant not found."
        ]);
        exit;
    }

    $maxGuests = (int)$restaurant["max_guests"];

    $reservationStmt = $pdo->prepare("
        SELECT COALESCE(SUM(guests_count), 0) AS reserved_guests
        FROM reservations
        WHERE restaurant_id = ?
        AND reservation_date = ?
        AND status IN ('approved', 'pending', 'change_requested')
        AND reservation_time < ADDTIME(?, '03:00:00')
        AND ADDTIME(reservation_time, '03:00:00') > ?
    ");

    $reservationStmt->execute([
        $restaurantId,
        $reservationDate,
        $reservationTime,
        $reservationTime
    ]);

    $reservationData = $reservationStmt->fetch(PDO::FETCH_ASSOC);

    $reservedGuests = (int)$reservationData["reserved_guests"];
    $availableGuests = max(0, $maxGuests - $reservedGuests);

    echo json_encode([
        "success" => true,
        "maxGuests" => $maxGuests,
        "reservedGuests" => $reservedGuests,
        "availableGuests" => $availableGuests,
        "durationHours" => $reservationDurationHours
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}