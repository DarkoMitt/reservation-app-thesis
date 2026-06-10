<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";
require_once "../helpers/create-notification.php";

$data = json_decode(file_get_contents("php://input"), true);

$reservationId = $data["reservationId"] ?? null;
$customerUserId = $data["customerUserId"] ?? null;
$suggestedDate = $data["suggestedDate"] ?? null;
$suggestedTime = $data["suggestedTime"] ?? null;
$suggestedGuestsCount = $data["suggestedGuestsCount"] ?? null;
$changeReason = trim($data["changeReason"] ?? "");

if (!$reservationId || !$customerUserId || !$suggestedDate || !$suggestedTime || !$suggestedGuestsCount || $changeReason === "") {
    echo json_encode([
        "success" => false,
        "message" => "Suggested date, time, guests count and reason are required."
    ]);
    exit;
}

if ((int)$suggestedGuestsCount <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Guests count must be greater than 0."
    ]);
    exit;
}

try {
    $pdo->beginTransaction();

    $reservationStmt = $pdo->prepare("
        SELECT
            reservations.id,
            reservations.customer_user_id,
            reservations.restaurant_id,
            reservations.reservation_date,
            reservations.reservation_time,
            reservations.guests_count,
            reservations.status,

            restaurants.restaurant_name,
            restaurants.max_guests,
            restaurants.user_id AS restaurant_user_id
        FROM reservations
        INNER JOIN restaurants
            ON restaurants.id = reservations.restaurant_id
        WHERE reservations.id = ?
        AND reservations.customer_user_id = ?
        LIMIT 1
    ");

    $reservationStmt->execute([
        $reservationId,
        $customerUserId
    ]);

    $reservation = $reservationStmt->fetch(PDO::FETCH_ASSOC);

    if (!$reservation) {
        $pdo->rollBack();

        echo json_encode([
            "success" => false,
            "message" => "Reservation not found."
        ]);
        exit;
    }

    $currentStatus = $reservation["status"];

    if (!in_array($currentStatus, ["pending", "approved"])) {
        $pdo->rollBack();

        echo json_encode([
            "success" => false,
            "message" => "Only pending or approved reservations can be changed."
        ]);
        exit;
    }

    $restaurantId = (int)$reservation["restaurant_id"];
    $restaurantUserId = (int)$reservation["restaurant_user_id"];
    $restaurantName = $reservation["restaurant_name"];
    $maxGuests = (int)$reservation["max_guests"];
    $currentGuests = (int)$reservation["guests_count"];
    $newGuests = (int)$suggestedGuestsCount;

    if ($currentStatus === "approved") {
        $reservationDateTime = strtotime($reservation["reservation_date"] . " " . $reservation["reservation_time"]);
        $twoHoursBeforeReservation = $reservationDateTime - (2 * 60 * 60);

        if (time() > $twoHoursBeforeReservation) {
            $pdo->rollBack();

            echo json_encode([
                "success" => false,
                "message" => "You can request changes only up to 2 hours before the reservation."
            ]);
            exit;
        }
    }

    $capacityStmt = $pdo->prepare("
        SELECT COALESCE(SUM(guests_count), 0) AS reserved_guests
        FROM reservations
        WHERE restaurant_id = ?
        AND reservation_date = ?
        AND id != ?
        AND status IN ('approved', 'change_requested', 'customer_change_requested')
        AND reservation_time < ADDTIME(?, '03:00:00')
        AND ADDTIME(reservation_time, '03:00:00') > ?
    ");

    $capacityStmt->execute([
        $restaurantId,
        $suggestedDate,
        $reservationId,
        $suggestedTime,
        $suggestedTime
    ]);

    $capacityData = $capacityStmt->fetch(PDO::FETCH_ASSOC);
    $reservedGuests = (int)$capacityData["reserved_guests"];

    if ($reservedGuests + $newGuests > $maxGuests) {
        $pdo->rollBack();

        echo json_encode([
            "success" => false,
            "message" => "The restaurant is full for this time slot. Your reservation remains unchanged."
        ]);
        exit;
    }

    if ($currentStatus === "pending") {
        $updateStmt = $pdo->prepare("
            UPDATE reservations
            SET
                reservation_date = ?,
                reservation_time = ?,
                guests_count = ?,
                suggested_date = NULL,
                suggested_time = NULL,
                suggested_guests_count = NULL,
                change_reason = ?,
                change_requested_by = 'customer',
                change_expires_at = NULL,
                rejection_reason = NULL
            WHERE id = ?
        ");

        $updateStmt->execute([
            $suggestedDate,
            $suggestedTime,
            $newGuests,
            $changeReason,
            $reservationId
        ]);

        createNotification(
            $pdo,
            $restaurantUserId,
            "restaurant",
            "Pending Reservation Updated",
            "A customer updated a pending reservation for " . $restaurantName . ". New date: " . $suggestedDate . ", time: " . substr($suggestedTime, 0, 5) . ", guests: " . $newGuests . ".",
            "customer_updated_pending_reservation",
            (int)$reservationId,
            $restaurantId
        );

        $message = "Your pending reservation was updated. It is still waiting for restaurant approval.";

    } else {
        $updateStmt = $pdo->prepare("
            UPDATE reservations
            SET
                status = 'customer_change_requested',
                suggested_date = ?,
                suggested_time = ?,
                suggested_guests_count = ?,
                change_reason = ?,
                change_requested_by = 'customer',
                change_expires_at = NULL,
                rejection_reason = NULL
            WHERE id = ?
        ");

        $updateStmt->execute([
            $suggestedDate,
            $suggestedTime,
            $newGuests,
            $changeReason,
            $reservationId
        ]);

        createNotification(
            $pdo,
            $restaurantUserId,
            "restaurant",
            "Customer Requested Reservation Change",
            "A customer requested changes for an approved reservation. Requested date: " . $suggestedDate . ", time: " . substr($suggestedTime, 0, 5) . ", guests: " . $newGuests . ".",
            "customer_change_requested",
            (int)$reservationId,
            $restaurantId
        );

        $message = "Your change request was sent to the restaurant. Your original reservation remains active until the restaurant approves the change.";
    }

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => $message
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