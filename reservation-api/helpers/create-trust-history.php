<?php

function createTrustHistory(
    PDO $pdo,
    int $userId,
    ?int $reservationId,
    int $changeValue,
    int $oldScore,
    int $newScore,
    string $reason
) {
    $stmt = $pdo->prepare("
        INSERT INTO trust_score_history (
            user_id,
            reservation_id,
            change_value,
            old_score,
            new_score,
            reason
        )
        VALUES (?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $userId,
        $reservationId,
        $changeValue,
        $oldScore,
        $newScore,
        $reason
    ]);
}