<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";
require_once "../helpers/create-notification.php";
require_once "../helpers/process-waitlist.php";

$data = json_decode(file_get_contents("php://input"), true);

$reservationId = $data["reservationId"] ?? null;
$action = $data["action"] ?? null;

if (!$reservationId || !$action || !in_array($action, ["accept", "reject"])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request data."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT
            reservations.id,
            reservations.status,
            reservations.customer_user_id,
            reservations.restaurant_id,
            reservations.reservation_date,
            reservations.reservation_time,
            reservations.guests_count,
            reservations.suggested_date,
            reservations.suggested_time,
            reservations.suggested_guests_count,
            reservations.change_expires_at,

            restaurants.restaurant_name,
            restaurants.user_id AS restaurant_user_id,

            users.first_name,
            users.last_name
        FROM reservations
        INNER JOIN restaurants
            ON restaurants.id = reservations.restaurant_id
        INNER JOIN users
            ON users.id = reservations.customer_user_id
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

    if ($reservation["status"] !== "change_requested") {
        echo json_encode([
            "success" => false,
            "message" => "This reservation does not have a pending change offer."
        ]);
        exit;
    }

    $customerName = trim($reservation["first_name"] . " " . $reservation["last_name"]);
    $restaurantUserId = (int)$reservation["restaurant_user_id"];
    $restaurantId = (int)$reservation["restaurant_id"];
    $reservationDate = $reservation["reservation_date"];
    $reservationTime = $reservation["reservation_time"];

    if ($reservation["change_expires_at"] && strtotime($reservation["change_expires_at"]) < time()) {
        $expireStmt = $pdo->prepare("
            UPDATE reservations
            SET
                status = 'rejected',
                rejection_reason = 'The suggested change expired because the customer did not respond within 1 hour.',
                suggested_date = NULL,
                suggested_time = NULL,
                suggested_guests_count = NULL,
                change_reason = NULL,
                change_expires_at = NULL
            WHERE id = ?
        ");

        $expireStmt->execute([$reservationId]);

        createNotification(
            $pdo,
            $restaurantUserId,
            "restaurant",
            "Change Request Expired",
            $customerName . " did not respond to your suggested reservation change in time.",
            "change_request_expired",
            (int)$reservationId,
            $restaurantId
        );

        processWaitlist(
            $pdo,
            $restaurantId,
            $reservationDate,
            $reservationTime
        );

        echo json_encode([
            "success" => false,
            "message" => "This change offer has expired."
        ]);
        exit;
    }

    if ($action === "accept") {
        $acceptStmt = $pdo->prepare("
            UPDATE reservations
            SET
                reservation_date = suggested_date,
                reservation_time = suggested_time,
                guests_count = suggested_guests_count,
                status = 'approved',
                suggested_date = NULL,
                suggested_time = NULL,
                suggested_guests_count = NULL,
                change_reason = NULL,
                change_expires_at = NULL,
                rejection_reason = NULL
            WHERE id = ?
        ");

        $acceptStmt->execute([$reservationId]);

        createNotification(
            $pdo,
            $restaurantUserId,
            "restaurant",
            "Change Request Accepted",
            $customerName . " accepted your suggested reservation change.",
            "change_request_accepted",
            (int)$reservationId,
            $restaurantId
        );

        echo json_encode([
            "success" => true,
            "message" => "Suggested changes accepted successfully."
        ]);
        exit;
    }

    $rejectStmt = $pdo->prepare("
        UPDATE reservations
        SET
            status = 'rejected',
            rejection_reason = 'Customer rejected the restaurant suggested changes.',
            suggested_date = NULL,
            suggested_time = NULL,
            suggested_guests_count = NULL,
            change_reason = NULL,
            change_expires_at = NULL
        WHERE id = ?
    ");

    $rejectStmt->execute([$reservationId]);

    createNotification(
        $pdo,
        $restaurantUserId,
        "restaurant",
        "Change Request Rejected",
        $customerName . " rejected your suggested reservation change.",
        "change_request_rejected",
        (int)$reservationId,
        $restaurantId
    );

    processWaitlist(
        $pdo,
        $restaurantId,
        $reservationDate,
        $reservationTime
    );

    echo json_encode([
        "success" => true,
        "message" => "Suggested changes rejected successfully."
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}