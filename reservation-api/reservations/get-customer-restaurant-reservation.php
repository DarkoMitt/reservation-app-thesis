<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$customerUserId = $data["customerUserId"] ?? null;
$restaurantId = $data["restaurantId"] ?? null;

if (!$customerUserId || !$restaurantId) {
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT
            id,
            reservation_date,
            reservation_time,
            guests_count,
            status,
            no_show_risk,
            trust_score,
            special_request,
            created_at
        FROM reservations
        WHERE customer_user_id = ?
        AND restaurant_id = ?
        AND status IN ('pending', 'approved', 'change_requested')
        ORDER BY created_at DESC
        LIMIT 1
    ");

    $stmt->execute([
        $customerUserId,
        $restaurantId
    ]);

    $reservation = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "reservation" => $reservation ?: null
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}