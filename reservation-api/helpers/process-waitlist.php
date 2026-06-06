<?php

function processWaitlist(PDO $pdo, int $restaurantId, string $reservationDate, string $reservationTime) {
    $restaurantStmt = $pdo->prepare("
        SELECT max_guests
        FROM restaurants
        WHERE id = ?
        LIMIT 1
    ");

    $restaurantStmt->execute([$restaurantId]);
    $restaurant = $restaurantStmt->fetch(PDO::FETCH_ASSOC);

    if (!$restaurant) {
        return;
    }

    $maxGuests = (int)$restaurant["max_guests"];

    $capacityStmt = $pdo->prepare("
        SELECT COALESCE(SUM(guests_count), 0) AS reserved_guests
        FROM reservations
        WHERE restaurant_id = ?
        AND reservation_date = ?
        AND status IN ('approved', 'pending', 'change_requested')
        AND reservation_time < ADDTIME(?, '03:00:00')
        AND ADDTIME(reservation_time, '03:00:00') > ?
    ");

    $capacityStmt->execute([
        $restaurantId,
        $reservationDate,
        $reservationTime,
        $reservationTime
    ]);

    $capacityData = $capacityStmt->fetch(PDO::FETCH_ASSOC);
    $reservedGuests = (int)$capacityData["reserved_guests"];
    $availableGuests = max(0, $maxGuests - $reservedGuests);

    if ($availableGuests <= 0) {
        return;
    }

    $waitlistStmt = $pdo->prepare("
        SELECT
            reservations.id,
            reservations.customer_user_id,
            reservations.guests_count,
            users.first_name,
            users.last_name,
            restaurants.user_id AS restaurant_user_id
        FROM reservations
        INNER JOIN users
            ON users.id = reservations.customer_user_id
        INNER JOIN restaurants
            ON restaurants.id = reservations.restaurant_id
        WHERE reservations.restaurant_id = ?
        AND reservations.reservation_date = ?
        AND reservations.status = 'waitlisted'
        AND reservations.reservation_time < ADDTIME(?, '03:00:00')
        AND ADDTIME(reservations.reservation_time, '03:00:00') > ?
        ORDER BY reservations.created_at ASC
    ");

    $waitlistStmt->execute([
        $restaurantId,
        $reservationDate,
        $reservationTime,
        $reservationTime
    ]);

    $waitlistedReservations = $waitlistStmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($waitlistedReservations as $waitlisted) {
        $waitlistedGuests = (int)$waitlisted["guests_count"];

        if ($waitlistedGuests > $availableGuests) {
            continue;
        }

        $updateStmt = $pdo->prepare("
            UPDATE reservations
            SET status = 'pending'
            WHERE id = ?
            AND status = 'waitlisted'
        ");

        $updateStmt->execute([(int)$waitlisted["id"]]);

        $availableGuests -= $waitlistedGuests;

        $customerName = trim($waitlisted["first_name"] . " " . $waitlisted["last_name"]);
        $shortTime = substr($reservationTime, 0, 5);

        if (function_exists("createNotification")) {
            createNotification(
                $pdo,
                (int)$waitlisted["customer_user_id"],
                "customer",
                "Moved from Waitlist",
                "A spot became available for your reservation on " . $reservationDate . " at " . $shortTime . ". Your request is now pending restaurant confirmation.",
                "waitlist_promoted_customer",
                (int)$waitlisted["id"],
                $restaurantId
            );

            createNotification(
                $pdo,
                (int)$waitlisted["restaurant_user_id"],
                "restaurant",
                "Waitlist Request Promoted",
                $customerName . " was moved from waitlist to pending for " . $waitlistedGuests . " guests on " . $reservationDate . " at " . $shortTime . ".",
                "waitlist_promoted_restaurant",
                (int)$waitlisted["id"],
                $restaurantId
            );
        }

        if ($availableGuests <= 0) {
            break;
        }
    }
}