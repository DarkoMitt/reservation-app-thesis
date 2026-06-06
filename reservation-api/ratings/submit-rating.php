<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

require_once "../config/database.php";
require_once "../helpers/create-trust-history.php";

$data = json_decode(file_get_contents("php://input"), true);

$reservationId = $data["reservationId"] ?? null;
$reviewerUserId = $data["reviewerUserId"] ?? null;
$ratingType = $data["ratingType"] ?? null;

$overallRating = $data["overallRating"] ?? null;
$foodRating = $data["foodRating"] ?? null;
$serviceRating = $data["serviceRating"] ?? null;
$atmosphereRating = $data["atmosphereRating"] ?? null;
$pricePerPerson = $data["pricePerPerson"] ?? null;
$reviewText = trim($data["reviewText"] ?? "");

$allowedTypes = [
    "customer_to_restaurant",
    "restaurant_to_customer",
    "customer_to_restaurant_response"
];

if (!$reservationId || !$reviewerUserId || !$ratingType || !in_array($ratingType, $allowedTypes)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid rating data."
    ]);
    exit;
}

try {
    $reservationStmt = $pdo->prepare("
        SELECT
            reservations.id,
            reservations.customer_user_id,
            reservations.restaurant_id,
            reservations.status,
            restaurants.user_id AS restaurant_user_id
        FROM reservations
        INNER JOIN restaurants
            ON reservations.restaurant_id = restaurants.id
        WHERE reservations.id = ?
        LIMIT 1
    ");

    $reservationStmt->execute([$reservationId]);
    $reservation = $reservationStmt->fetch(PDO::FETCH_ASSOC);

    if (!$reservation) {
        echo json_encode([
            "success" => false,
            "message" => "Reservation not found."
        ]);
        exit;
    }

    $restaurantId = (int)$reservation["restaurant_id"];
    $customerUserId = (int)$reservation["customer_user_id"];
    $restaurantUserId = (int)$reservation["restaurant_user_id"];

    if ($ratingType === "customer_to_restaurant") {
        if ($reservation["status"] !== "visited") {
            echo json_encode([
                "success" => false,
                "message" => "Restaurant ratings are allowed only after the visit is confirmed."
            ]);
            exit;
        }

        if ((int)$reviewerUserId !== $customerUserId) {
            echo json_encode([
                "success" => false,
                "message" => "Only the customer can rate the restaurant."
            ]);
            exit;
        }

        if (
            !$foodRating ||
            !$serviceRating ||
            !$atmosphereRating ||
            (int)$foodRating < 1 || (int)$foodRating > 5 ||
            (int)$serviceRating < 1 || (int)$serviceRating > 5 ||
            (int)$atmosphereRating < 1 || (int)$atmosphereRating > 5
        ) {
            echo json_encode([
                "success" => false,
                "message" => "Food, service and atmosphere ratings must be between 1 and 5."
            ]);
            exit;
        }

        $targetUserId = $restaurantUserId;
        $overallRating = round(((int)$foodRating + (int)$serviceRating + (int)$atmosphereRating) / 3, 1);

    } elseif ($ratingType === "restaurant_to_customer") {
        if ($reservation["status"] !== "visited") {
            echo json_encode([
                "success" => false,
                "message" => "Customer ratings are allowed only after the visit is confirmed."
            ]);
            exit;
        }

        if ((int)$reviewerUserId !== $restaurantUserId) {
            echo json_encode([
                "success" => false,
                "message" => "Only the restaurant can rate the customer."
            ]);
            exit;
        }

        if (!$overallRating || (int)$overallRating < 1 || (int)$overallRating > 5) {
            echo json_encode([
                "success" => false,
                "message" => "Overall rating must be between 1 and 5."
            ]);
            exit;
        }

        $targetUserId = $customerUserId;
        $overallRating = (int)$overallRating;
        $foodRating = null;
        $serviceRating = null;
        $atmosphereRating = null;
        $pricePerPerson = null;

    } else {
        if ($reservation["status"] !== "expired") {
            echo json_encode([
                "success" => false,
                "message" => "Restaurant response ratings are allowed only for expired reservation requests."
            ]);
            exit;
        }

        if ((int)$reviewerUserId !== $customerUserId) {
            echo json_encode([
                "success" => false,
                "message" => "Only the customer can rate the restaurant response."
            ]);
            exit;
        }

        if (!$overallRating || (int)$overallRating < 1 || (int)$overallRating > 5) {
            echo json_encode([
                "success" => false,
                "message" => "Response rating must be between 1 and 5."
            ]);
            exit;
        }

        $targetUserId = $restaurantUserId;
        $overallRating = (int)$overallRating;
        $foodRating = null;
        $serviceRating = null;
        $atmosphereRating = null;
        $pricePerPerson = null;
    }

    $duplicateStmt = $pdo->prepare("
        SELECT id
        FROM ratings
        WHERE reservation_id = ?
        AND rating_type = ?
        LIMIT 1
    ");

    $duplicateStmt->execute([
        $reservationId,
        $ratingType
    ]);

    if ($duplicateStmt->fetch(PDO::FETCH_ASSOC)) {
        echo json_encode([
            "success" => false,
            "message" => "Rating for this reservation already exists."
        ]);
        exit;
    }

    $pdo->beginTransaction();

    $insertStmt = $pdo->prepare("
        INSERT INTO ratings (
            reservation_id,
            reviewer_user_id,
            target_user_id,
            restaurant_id,
            rating_type,
            overall_rating,
            food_rating,
            service_rating,
            atmosphere_rating,
            review_text,
            price_per_person
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $insertStmt->execute([
        $reservationId,
        $reviewerUserId,
        $targetUserId,
        $restaurantId,
        $ratingType,
        $overallRating,
        $foodRating !== null ? (int)$foodRating : null,
        $serviceRating !== null ? (int)$serviceRating : null,
        $atmosphereRating !== null ? (int)$atmosphereRating : null,
        $reviewText !== "" ? $reviewText : null,
        $pricePerPerson !== null && $pricePerPerson !== "" ? (int)$pricePerPerson : null
    ]);

    if ($ratingType === "customer_to_restaurant") {
        $userScoreStmt = $pdo->prepare("
            SELECT trust_score
            FROM users
            WHERE id = ?
            LIMIT 1
        ");

        $userScoreStmt->execute([$customerUserId]);
        $oldScore = (int)$userScoreStmt->fetchColumn();
        $newScore = min($oldScore + 2, 100);

        $trustStmt = $pdo->prepare("
            UPDATE users
            SET trust_score = ?
            WHERE id = ?
        ");

        $trustStmt->execute([
            $newScore,
            $customerUserId
        ]);

        createTrustHistory(
            $pdo,
            $customerUserId,
            (int)$reservationId,
            2,
            $oldScore,
            $newScore,
            "Restaurant review submitted"
        );
    }

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Rating submitted successfully."
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