<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";
require_once "../helpers/create-notification.php";

try {
    $pdo->beginTransaction();

    $warningStmt = $pdo->prepare("
        SELECT
            reservations.id,
            reservations.customer_user_id,
            reservations.restaurant_id,
            reservations.reservation_date,
            reservations.reservation_time,
            reservations.guests_count,

            restaurants.restaurant_name,
            restaurants.user_id AS restaurant_user_id,

            users.first_name,
            users.last_name
        FROM reservations
        INNER JOIN restaurants ON restaurants.id = reservations.restaurant_id
        INNER JOIN users ON users.id = reservations.customer_user_id
        WHERE reservations.status = 'pending'
        AND DATE_SUB(CONCAT(reservations.reservation_date, ' ', reservations.reservation_time), INTERVAL 6 HOUR) <= NOW()
    ");

    $warningStmt->execute();
    $pendingReservations = $warningStmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($pendingReservations as $reservation) {
        $customerName = trim($reservation["first_name"] . " " . $reservation["last_name"]);
        $reservationTime = substr($reservation["reservation_time"], 0, 5);

        createNotification(
            $pdo,
            (int)$reservation["restaurant_user_id"],
            "restaurant",
            "Pending Reservation Deadline",
            "You have a pending reservation from " . $customerName . " for " . $reservation["reservation_date"] . " at " . $reservationTime . ". Please approve, reject or suggest changes before it expires.",
            "pending_reservation_deadline",
            (int)$reservation["id"],
            (int)$reservation["restaurant_id"]
        );
    }

    $expiredStmt = $pdo->prepare("
        SELECT
            reservations.id,
            reservations.customer_user_id,
            reservations.restaurant_id,
            reservations.reservation_date,
            reservations.reservation_time,

            restaurants.restaurant_name,
            restaurants.user_id AS restaurant_user_id,

            users.first_name,
            users.last_name
        FROM reservations
        INNER JOIN restaurants ON restaurants.id = reservations.restaurant_id
        INNER JOIN users ON users.id = reservations.customer_user_id
        WHERE reservations.status = 'pending'
        AND DATE_SUB(CONCAT(reservations.reservation_date, ' ', reservations.reservation_time), INTERVAL 5 HOUR) <= NOW()
    ");

    $expiredStmt->execute();
    $expiredReservations = $expiredStmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($expiredReservations as $reservation) {
        $customerName = trim($reservation["first_name"] . " " . $reservation["last_name"]);
        $reservationTime = substr($reservation["reservation_time"], 0, 5);

        $updateStmt = $pdo->prepare("
            UPDATE reservations
            SET
                status = 'expired',
                rejection_reason = 'Restaurant did not respond before the reservation confirmation deadline.'
            WHERE id = ?
            AND status = 'pending'
        ");

        $updateStmt->execute([(int)$reservation["id"]]);

        createNotification(
            $pdo,
            (int)$reservation["customer_user_id"],
            "customer",
            "Reservation Expired",
            $reservation["restaurant_name"] . " did not respond before the confirmation deadline, so your reservation for " . $reservation["reservation_date"] . " at " . $reservationTime . " expired.",
            "reservation_expired",
            (int)$reservation["id"],
            (int)$reservation["restaurant_id"]
        );

        createNotification(
            $pdo,
            (int)$reservation["restaurant_user_id"],
            "restaurant",
            "Reservation Expired",
            "The pending reservation from " . $customerName . " for " . $reservation["reservation_date"] . " at " . $reservationTime . " expired because no action was taken.",
            "reservation_expired_restaurant",
            (int)$reservation["id"],
            (int)$reservation["restaurant_id"]
        );
    }

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Notifications generated successfully."
    ]);

} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}