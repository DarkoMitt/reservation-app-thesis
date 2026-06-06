<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data["userId"] ?? null;

$customerPreference = "No preferences";

if ($userId) {
    $profileStmt = $pdo->prepare("
        SELECT preferences
        FROM customer_profiles
        WHERE user_id = ?
        LIMIT 1
    ");
    $profileStmt->execute([$userId]);
    $profile = $profileStmt->fetch(PDO::FETCH_ASSOC);

    if ($profile && !empty($profile["preferences"])) {
        $customerPreference = $profile["preferences"];
    }
}

try {
    $stmt = $pdo->prepare("
        SELECT
            restaurants.id,
            restaurants.restaurant_name,
            restaurants.restaurant_type,
            restaurants.cuisine_type,
            restaurants.city,
            restaurants.address,
            restaurants.phone,
            restaurants.description,
            restaurants.max_guests,
            restaurants.working_hours,
            restaurants.mon_thu_hours,
            restaurants.fri_sun_hours,
            restaurants.has_smoking_area,
            restaurants.has_outdoor_seating,
            restaurants.has_parking,
            restaurants.has_wifi,
            restaurants.restaurant_image,
            restaurants.menu_image,
            restaurants.restaurant_images,
            restaurants.menu_images,
            restaurants.status,
            users.email,

            COALESCE(
                ROUND(
                    AVG(
                        (
                            COALESCE(ratings.food_rating, 0) +
                            COALESCE(ratings.service_rating, 0) +
                            COALESCE(ratings.atmosphere_rating, 0)
                        ) / 3
                    ),
                    1
                ),
                0
            ) AS average_rating,

            COUNT(DISTINCT ratings.id) AS total_reviews,

            (
                CASE
                    WHEN ? = 'No preferences' THEN COALESCE(
                        ROUND(
                            AVG(
                                (
                                    COALESCE(ratings.food_rating, 0) +
                                    COALESCE(ratings.service_rating, 0) +
                                    COALESCE(ratings.atmosphere_rating, 0)
                                ) / 3
                            ),
                            1
                        ),
                        0
                    )
                    WHEN LOWER(restaurants.cuisine_type) LIKE CONCAT('%', LOWER(?), '%') THEN 100
                    WHEN LOWER(restaurants.description) LIKE CONCAT('%', LOWER(?), '%') THEN 70
                    ELSE 0
                END
            ) AS match_score,

            (
                SELECT COUNT(*)
                FROM reservations
                WHERE reservations.restaurant_id = restaurants.id
                AND reservations.status = 'visited'
            ) AS visit_count,

            (
                SELECT COUNT(*)
                FROM reservations
                WHERE reservations.restaurant_id = restaurants.id
                AND reservations.status IN ('pending', 'approved', 'visited')
                AND reservations.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
            ) AS trending_score,

            (
                SELECT COALESCE(SUM(reservations.guests_count), 0)
                FROM reservations
                WHERE reservations.restaurant_id = restaurants.id
                AND reservations.reservation_date = CURDATE()
                AND reservations.status IN ('approved', 'change_requested')
                AND TIME(NOW()) >= reservations.reservation_time
                AND TIME(NOW()) < ADDTIME(reservations.reservation_time, '03:00:00')
            ) AS current_reserved_guests

        FROM restaurants
        INNER JOIN users
            ON restaurants.user_id = users.id
        LEFT JOIN ratings
            ON ratings.restaurant_id = restaurants.id
            AND ratings.rating_type = 'customer_to_restaurant'
        WHERE restaurants.status = 'approved'
        GROUP BY restaurants.id
        ORDER BY match_score DESC, average_rating DESC
    ");

    $stmt->execute([
        $customerPreference,
        $customerPreference,
        $customerPreference
    ]);

    echo json_encode([
        "success" => true,
        "customer_preference" => $customerPreference,
        "restaurants" => $stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}