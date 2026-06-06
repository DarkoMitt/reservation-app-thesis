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
        SELECT
            reservations.id,
            reservations.customer_user_id,
            reservations.restaurant_id,
            reservations.reservation_date,
            reservations.reservation_time,
            reservations.guests_count,
            reservations.status,
            reservations.created_at,

            CONCAT(users.first_name, ' ', users.last_name) AS full_name,
            users.email,

            (
                SELECT id
                FROM ratings
                WHERE ratings.reservation_id = reservations.id
                AND ratings.rating_type = 'restaurant_to_customer'
                LIMIT 1
            ) AS restaurant_customer_rating_id

        FROM reservations
        INNER JOIN users
            ON reservations.customer_user_id = users.id
        WHERE reservations.restaurant_id = ?
        AND reservations.status = 'visited'
        AND CONCAT(reservations.reservation_date, ' ', reservations.reservation_time) <= NOW()
        ORDER BY reservations.reservation_date DESC, reservations.reservation_time DESC
    ");

    $stmt->execute([$restaurantId]);

    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($requests as &$request) {
        $request["has_restaurant_customer_rating"] =
            $request["restaurant_customer_rating_id"] ? 1 : 0;
    }

    echo json_encode([
        "success" => true,
        "review_date" => date("Y-m-d"),
        "requests" => $requests
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}