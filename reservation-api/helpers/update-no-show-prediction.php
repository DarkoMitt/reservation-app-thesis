<?php

function updateNoShowPrediction(PDO $pdo, int $reservationId) {
    $stmt = $pdo->prepare("
        SELECT
            reservations.id,
            reservations.customer_user_id,
            users.trust_score,
            users.no_show_count
        FROM reservations
        INNER JOIN users
            ON users.id = reservations.customer_user_id
        WHERE reservations.id = ?
        LIMIT 1
    ");

    $stmt->execute([$reservationId]);
    $reservation = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$reservation) {
        return;
    }

    $customerUserId = (int)$reservation["customer_user_id"];
    $trustScore = (int)$reservation["trust_score"];
    $noShowCount = (int)$reservation["no_show_count"];

    $statsStmt = $pdo->prepare("
        SELECT
            SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_reservations,
            SUM(CASE WHEN status = 'visited' THEN 1 ELSE 0 END) AS visited_reservations,
            COUNT(*) AS total_reservations
        FROM reservations
        WHERE customer_user_id = ?
    ");

    $statsStmt->execute([$customerUserId]);
    $stats = $statsStmt->fetch(PDO::FETCH_ASSOC);

    $cancelledReservations = (int)($stats["cancelled_reservations"] ?? 0);
    $visitedReservations = (int)($stats["visited_reservations"] ?? 0);
    $totalReservations = (int)($stats["total_reservations"] ?? 0);

    $isNewCustomer = $totalReservations < 3 ? 1 : 0;

    $mlPath = realpath(__DIR__ . "/../ml/predict_no_show.py");
    $pythonScriptDir = realpath(__DIR__ . "/../ml");

    if (!$mlPath || !$pythonScriptDir) {
        return;
    }

    $command = "cd " . escapeshellarg($pythonScriptDir) .
        " && python " . escapeshellarg($mlPath) . " " .
        escapeshellarg((string)$trustScore) . " " .
        escapeshellarg((string)$noShowCount) . " " .
        escapeshellarg((string)$cancelledReservations) . " " .
        escapeshellarg((string)$visitedReservations) . " " .
        escapeshellarg((string)$isNewCustomer);

    $output = shell_exec($command);

    if (!$output) {
        return;
    }

    $prediction = json_decode($output, true);

    if (!$prediction || !isset($prediction["risk_percentage"], $prediction["risk_level"])) {
        return;
    }

    $riskPercentage = (int)$prediction["risk_percentage"];
    $riskLevel = strtolower($prediction["risk_level"]);
    $factors = json_encode($prediction["factors"] ?? [], JSON_UNESCAPED_UNICODE);
    $explanation = $prediction["explanation"] ?? "";

    $updateStmt = $pdo->prepare("
        UPDATE reservations
        SET
            risk_percentage = ?,
            no_show_risk = ?,
            prediction_factors = ?,
            prediction_explanation = ?,
            prediction_updated_at = NOW()
        WHERE id = ?
    ");

    $updateStmt->execute([
        $riskPercentage,
        $riskLevel,
        $factors,
        $explanation,
        $reservationId
    ]);
}