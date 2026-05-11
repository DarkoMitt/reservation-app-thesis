<?php

require_once "../config/database.php";

$email = "admin@reservationapp.com";
$phone = "+38970000000";
$password = password_hash("Admin123.!", PASSWORD_DEFAULT);

$stmt = $pdo->prepare("
    INSERT INTO users
    (first_name, last_name, phone, email, password, role, status)
    VALUES
    ('Darko', 'Admin', ?, ?, ?, 'admin', 'active')
    ON DUPLICATE KEY UPDATE
    password = VALUES(password),
    role = 'admin',
    status = 'active'
");

$stmt->execute([$phone, $email, $password]);

echo "Admin created/updated successfully.";