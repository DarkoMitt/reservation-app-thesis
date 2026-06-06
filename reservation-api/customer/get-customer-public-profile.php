<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);
$customerUserId = $data["customerUserId"] ?? null;

if (!$customerUserId) {
    echo json_encode(["success" => false, "message" => "Customer ID is required."]);
    exit;
}

try {
    $customerStmt = $pdo->prepare("
        SELECT
            users.id,
            users.first_name,
            users.last_name,
            users.email,
            users.phone,
            users.status,
            users.trust_score,
            users.no_show_count,
            customer_profiles.city,
            customer_profiles.age,
            customer_profiles.preferences
        FROM users
        LEFT JOIN customer_profiles ON customer_profiles.user_id = users.id
        WHERE users.id = ?
        AND users.role = 'customer'
        LIMIT 1
    ");

    $customerStmt->execute([$customerUserId]);
    $customer = $customerStmt->fetch(PDO::FETCH_ASSOC);

    if (!$customer) {
        echo json_encode(["success" => false, "message" => "Customer not found."]);
        exit;
    }

    $statsStmt = $pdo->prepare("
        SELECT
            COUNT(*) AS total_reservations,
            SUM(CASE WHEN status = 'visited' THEN 1 ELSE 0 END) AS visited_reservations,
            SUM(CASE WHEN status = 'no_show' THEN 1 ELSE 0 END) AS no_show_reservations,
            SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_reservations,
            SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected_reservations,
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_reservations,
            SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_reservations,
            SUM(CASE WHEN status = 'change_requested' THEN 1 ELSE 0 END) AS changed_reservations
        FROM reservations
        WHERE customer_user_id = ?
    ");

    $statsStmt->execute([$customerUserId]);
    $stats = $statsStmt->fetch(PDO::FETCH_ASSOC);

    $ratingsStmt = $pdo->prepare("
        SELECT
            ratings.id,
            ratings.overall_rating,
            ratings.review_text,
            ratings.created_at,
            restaurants.restaurant_name
        FROM ratings
        INNER JOIN reservations ON reservations.id = ratings.reservation_id
        INNER JOIN restaurants ON restaurants.id = reservations.restaurant_id
        WHERE reservations.customer_user_id = ?
        AND ratings.rating_type = 'restaurant_to_customer'
        ORDER BY ratings.created_at DESC
    ");

    $ratingsStmt->execute([$customerUserId]);
    $ratings = $ratingsStmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "customer" => $customer,
        "stats" => $stats,
        "ratings" => $ratings
    ]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}