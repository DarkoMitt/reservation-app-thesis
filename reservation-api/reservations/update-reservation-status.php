<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$reservationId = $data["reservationId"] ?? null;
$status = $data["status"] ?? null;

$rejectionReason = trim($data["rejectionReason"] ?? "");

$suggestedDate = $data["suggestedDate"] ?? null;
$suggestedTime = $data["suggestedTime"] ?? null;
$suggestedGuestsCount = $data["suggestedGuestsCount"] ?? null;
$changeReason = trim($data["changeReason"] ?? "");

$allowedStatuses = [
    "pending",
    "approved",
    "rejected",
    "change_requested",
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

if ($status === "rejected" && $rejectionReason === "") {
    echo json_encode([
        "success" => false,
        "message" => "Rejection reason is required."
    ]);
    exit;
}

if ($status === "change_requested") {
    if (!$suggestedDate || !$suggestedTime || !$suggestedGuestsCount || $changeReason === "") {
        echo json_encode([
            "success" => false,
            "message" => "Suggested date, time, guests count and reason are required."
        ]);
        exit;
    }

    if ((int)$suggestedGuestsCount <= 0) {
        echo json_encode([
            "success" => false,
            "message" => "Suggested guests count must be greater than 0."
        ]);
        exit;
    }
}

try {
    if ($status === "rejected") {
        $stmt = $pdo->prepare("
            UPDATE reservations
            SET
                status = ?,
                rejection_reason = ?,
                suggested_date = NULL,
                suggested_time = NULL,
                suggested_guests_count = NULL,
                change_reason = NULL,
                change_expires_at = NULL
            WHERE id = ?
        ");

        $stmt->execute([
            $status,
            $rejectionReason,
            $reservationId
        ]);
    } elseif ($status === "change_requested") {
        $stmt = $pdo->prepare("
            UPDATE reservations
            SET
                status = ?,
                suggested_date = ?,
                suggested_time = ?,
                suggested_guests_count = ?,
                change_reason = ?,
                change_expires_at = DATE_ADD(NOW(), INTERVAL 1 HOUR),
                rejection_reason = NULL
            WHERE id = ?
        ");

        $stmt->execute([
            $status,
            $suggestedDate,
            $suggestedTime,
            (int)$suggestedGuestsCount,
            $changeReason,
            $reservationId
        ]);
    } else {
        $stmt = $pdo->prepare("
            UPDATE reservations
            SET
                status = ?,
                rejection_reason = NULL,
                suggested_date = NULL,
                suggested_time = NULL,
                suggested_guests_count = NULL,
                change_reason = NULL,
                change_expires_at = NULL
            WHERE id = ?
        ");

        $stmt->execute([
            $status,
            $reservationId
        ]);
    }

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