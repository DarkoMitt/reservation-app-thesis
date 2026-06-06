<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$reservationId = $data["reservationId"] ?? null;

if (!$reservationId) {
    echo json_encode([
        "success" => false,
        "message" => "Reservation ID is required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT
            reservations.*,
            restaurants.restaurant_name,
            restaurants.city,
            restaurants.address,
            restaurants.cuisine_type,

            (
                SELECT COUNT(*)
                FROM reservations AS waitlist_position
                WHERE waitlist_position.restaurant_id = reservations.restaurant_id
                AND waitlist_position.reservation_date = reservations.reservation_date
                AND waitlist_position.status = 'waitlisted'
                AND waitlist_position.reservation_time < ADDTIME(reservations.reservation_time, '03:00:00')
                AND ADDTIME(waitlist_position.reservation_time, '03:00:00') > reservations.reservation_time
                AND waitlist_position.created_at <= reservations.created_at
            ) AS waitlist_position

        FROM reservations
        INNER JOIN restaurants
            ON restaurants.id = reservations.restaurant_id
        WHERE reservations.id = ?
        LIMIT 1
    ");

    $stmt->execute([$reservationId]);
    $reservation = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$reservation) {
        echo json_encode([
            "success" => false,
            "message" => "Reservation not found."
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "reservation" => $reservation
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}