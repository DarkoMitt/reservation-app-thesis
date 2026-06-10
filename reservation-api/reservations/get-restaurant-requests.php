<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";
require_once "../helpers/update-no-show-prediction.php";

$changeCleanupStmt = $pdo->prepare("
    UPDATE reservations
    SET
        status = 'rejected',
        rejection_reason = 'The suggested change expired because the customer did not respond within 1 hour.',
        suggested_date = NULL,
        suggested_time = NULL,
        suggested_guests_count = NULL,
        change_reason = NULL,
        change_requested_by = NULL,
        change_expires_at = NULL
    WHERE status = 'change_requested'
    AND change_expires_at < NOW()
");

$changeCleanupStmt->execute();

$pendingExpirationStmt = $pdo->prepare("
    UPDATE reservations
    SET
        status = 'expired',
        rejection_reason = 'Restaurant did not respond before the reservation confirmation deadline.'
    WHERE status = 'pending'
    AND DATE_SUB(CONCAT(reservation_date, ' ', reservation_time), INTERVAL 5 HOUR) <= NOW()
");

$pendingExpirationStmt->execute();

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
            reservations.no_show_risk,
            reservations.risk_percentage,
            reservations.prediction_factors,
            reservations.prediction_explanation,
            reservations.prediction_updated_at,
            reservations.trust_score,
            reservations.special_request,
            reservations.created_at,
            reservations.rejection_reason,

            reservations.suggested_date,
            reservations.suggested_time,
            reservations.suggested_guests_count,
            reservations.change_reason,
            reservations.change_requested_by,
            reservations.change_expires_at,

            CONCAT(users.first_name, ' ', users.last_name) AS full_name,
            users.email,
            users.trust_score AS customer_trust_score,
            users.no_show_count AS customer_no_show_count,

            (
                SELECT COUNT(*)
                FROM reservations AS customer_reservations
                WHERE customer_reservations.customer_user_id = reservations.customer_user_id
            ) AS customer_total_reservations,

            (
                SELECT COUNT(*)
                FROM reservations AS waitlist_position
                WHERE waitlist_position.restaurant_id = reservations.restaurant_id
                AND waitlist_position.reservation_date = reservations.reservation_date
                AND waitlist_position.status = 'waitlisted'
                AND waitlist_position.reservation_time < ADDTIME(reservations.reservation_time, '03:00:00')
                AND ADDTIME(waitlist_position.reservation_time, '03:00:00') > reservations.reservation_time
                AND waitlist_position.created_at <= reservations.created_at
            ) AS waitlist_position,

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
        ORDER BY reservations.created_at DESC
    ");

    $stmt->execute([$restaurantId]);

    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($requests as &$request) {
        $request["is_new_customer"] =
            ((int)$request["customer_total_reservations"] < 3) ? 1 : 0;

        $request["has_restaurant_customer_rating"] =
            $request["restaurant_customer_rating_id"] ? 1 : 0;

        $decodedFactors = json_decode($request["prediction_factors"] ?? "[]", true);
        $request["prediction_factors"] = is_array($decodedFactors) ? $decodedFactors : [];

        $request["risk_percentage"] = (int)($request["risk_percentage"] ?? 0);
        $request["waitlist_position"] = (int)($request["waitlist_position"] ?? 0);

        $request["suggested_guests_count"] =
            $request["suggested_guests_count"] !== null
                ? (int)$request["suggested_guests_count"]
                : null;
    }

    echo json_encode([
        "success" => true,
        "requests" => $requests
    ]);

} catch (PDOException $e) {
     echo json_encode([
         "success" => false,
         "message" => $e->getMessage()
     ]);
}