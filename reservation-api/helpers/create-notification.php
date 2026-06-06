<?php

function createNotification(
    PDO $pdo,
    int $userId,
    string $role,
    string $title,
    string $message,
    string $type,
    ?int $reservationId = null,
    ?int $restaurantId = null
) {

    $stmt = $pdo->prepare("
        INSERT INTO notifications
        (
            user_id,
            role,
            title,
            message,
            notification_type,
            related_reservation_id,
            related_restaurant_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $userId,
        $role,
        $title,
        $message,
        $type,
        $reservationId,
        $restaurantId
    ]);
}