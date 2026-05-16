<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$reservationId = $data["reservationId"] ?? null;
$status = $data["status"] ?? null;

$allowedStatuses = [
    "pending",
    "approved",
    "rejected",
    "cancelled",
    "visited",
    "no_show"
];

if (!$reservationId || !$status || !in_array($status, $allowedStatuses)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid reservation data."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        UPDATE reservations
        SET status = ?
        WHERE id = ?
    ");

    $stmt->execute([
        $status,
        $reservationId
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Reservation status updated successfully."
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}