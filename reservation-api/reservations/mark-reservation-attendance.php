<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$reservationId = $data["reservationId"] ?? null;
$restaurantId = $data["restaurantId"] ?? null;
$status = $data["status"] ?? null;

$allowedStatuses = ["visited", "no_show"];

if (!$reservationId || !$restaurantId || !$status) {
    echo json_encode([
        "success" => false,
        "message" => "Reservation ID, Restaurant ID and status are required."
    ]);
    exit;
}

if (!in_array($status, $allowedStatuses)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid status."
    ]);
    exit;
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        SELECT id, customer_user_id, status
        FROM reservations
        WHERE id = ?
        AND restaurant_id = ?
        LIMIT 1
    ");
    $stmt->execute([$reservationId, $restaurantId]);
    $reservation = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$reservation) {
        $pdo->rollBack();
        echo json_encode([
            "success" => false,
            "message" => "Reservation not found."
        ]);
        exit;
    }

    if (!in_array($reservation["status"], ["approved", "visited", "no_show"])) {
        $pdo->rollBack();
        echo json_encode([
            "success" => false,
            "message" => "Only approved reservations can be marked as visited or no-show."
        ]);
        exit;
    }

    $updateReservation = $pdo->prepare("
        UPDATE reservations
        SET status = ?
        WHERE id = ?
    ");
    $updateReservation->execute([$status, $reservationId]);

    if ($status === "no_show") {
    $updateUser = $pdo->prepare("
        UPDATE users
        SET
            trust_score = GREATEST(trust_score - 20, 0),
            no_show_count = no_show_count + 1,
            status = CASE
                WHEN no_show_count + 1 >= 5 THEN 'banned'
                ELSE status
            END
        WHERE id = ?
    ");
    $updateUser->execute([$reservation["customer_user_id"]]);
}

    if ($status === "visited") {
        $updateUser = $pdo->prepare("
            UPDATE users
            SET trust_score = trust_score + 5
            WHERE id = ?
        ");
        $updateUser->execute([$reservation["customer_user_id"]]);
    }

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Reservation marked as " . $status . "."
    ]);

} catch (PDOException $e) {
    $pdo->rollBack();

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}