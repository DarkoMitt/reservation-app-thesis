<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");

require_once "../config/database.php";

try {
    $pendingRestaurants = $pdo->query("
        SELECT COUNT(*) AS total
        FROM restaurants
        WHERE status = 'pending'
    ")->fetch(PDO::FETCH_ASSOC);

    $activeUsers = $pdo->query("
        SELECT COUNT(*) AS total
        FROM users
        WHERE status = 'active'
    ")->fetch(PDO::FETCH_ASSOC);

    $bannedUsers = $pdo->query("
        SELECT COUNT(*) AS total
        FROM users
        WHERE status = 'banned'
    ")->fetch(PDO::FETCH_ASSOC);

    $approvedRestaurants = $pdo->query("
        SELECT COUNT(*) AS total
        FROM restaurants
        WHERE status = 'approved'
    ")->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "stats" => [
            "pending_restaurants" => (int)$pendingRestaurants["total"],
            "active_users" => (int)$activeUsers["total"],
            "banned_users" => (int)$bannedUsers["total"],
            "approved_restaurants" => (int)$approvedRestaurants["total"]
        ]
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}