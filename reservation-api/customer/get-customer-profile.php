<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$userId = $data["userId"] ?? null;

if (!$userId) {
    echo json_encode([
        "success" => false,
        "message" => "User ID is required."
    ]);
    exit;
}

try {
    $userStmt = $pdo->prepare("
    SELECT
        users.id,
        users.first_name,
        users.last_name,
        users.phone,
        users.email,
        users.role,
        users.status,
        users.trust_score,
        users.no_show_count,
        users.created_at,
        customer_profiles.age,
        customer_profiles.preferences
    FROM users
    LEFT JOIN customer_profiles
        ON customer_profiles.user_id = users.id
    WHERE users.id = ?
    AND users.role = 'customer'
    LIMIT 1
");

    $userStmt->execute([$userId]);
    $user = $userStmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode([
            "success" => false,
            "message" => "Customer not found."
        ]);
        exit;
    }

    $statsStmt = $pdo->prepare("
    SELECT
        COUNT(*) AS total_reservations,
        SUM(CASE WHEN status = 'visited' THEN 1 ELSE 0 END) AS visited_reservations,
        SUM(CASE WHEN status = 'no_show' THEN 1 ELSE 0 END) AS no_show_reservations,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_reservations,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_reservations,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved_reservations,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected_reservations,
        SUM(CASE WHEN status = 'change_requested' THEN 1 ELSE 0 END) AS change_requested_reservations,
        SUM(CASE WHEN status = 'expired' THEN 1 ELSE 0 END) AS expired_reservations,
        SUM(CASE WHEN status = 'waitlisted' THEN 1 ELSE 0 END) AS waitlisted_reservations
    FROM reservations
    WHERE customer_user_id = ?
");

    $statsStmt->execute([$userId]);
    $stats = $statsStmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "customer" => $user,
        "stats" => $stats
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}