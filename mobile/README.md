This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# DineSpot (Restaurant Reservation App Thesis)

This project is a full-stack restaurant reservation system developed as a bachelor thesis project.
It allows customers to discover restaurants and create reservations, restaurants to manage their reservations and profiles, and administrators to approve and manage users and restaurants.

The project consists of two main parts:

* **Mobile application** – React Native + TypeScript
* **Backend API** – PHP + MySQL, served through Apache/XAMPP

---

## Table of Contents

* [Project Overview](#project-overview)
* [Main Features](#main-features)
* [Technologies](#technologies)
* [Project Structure](#project-structure)
* [Requirements](#requirements)
* [Database Setup](#database-setup)
* [Backend API Setup](#backend-api-setup)
* [Mobile App Setup](#mobile-app-setup)
* [Running the Full Project](#running-the-full-project)
* [API Base URL Explanation](#api-base-url-explanation)
* [Working Hours Logic](#working-hours-logic)
* [Reservation Rules](#reservation-rules)
* [Common Issues](#common-issues)
* [Author](#author)

---

# Project Overview

The application solves the problem of inefficient restaurant reservation management.
Instead of managing reservations manually through phone calls, messages or notes, restaurants can use this system to manage reservations digitally.

The system supports:

* customer registration and login,
* restaurant registration and administrator approval,
* restaurant browsing,
* reservation creation,
* reservation approval or rejection,
* waitlist handling,
* customer trust score,
* no-show tracking,
* restaurant ratings,
* restaurant working hours by day,
* admin dashboard functionality.

---

# Main Features

## Customer Features

* Register and login as a customer
* Browse approved restaurants
* Search restaurants
* Filter restaurants by:

  * Best Match
  * Open Now
  * Highest Rated
  * Most Visited
  * Trending
  * Favorites
* View restaurant details
* View restaurant ratings
* Create reservation requests
* Join waitlist when the restaurant is full
* View own reservations
* Add restaurants to favorites
* Receive notifications
* Leave ratings after completed visits

---

## Restaurant Features

* Register as a restaurant
* Wait for admin approval
* Access restaurant dashboard after approval
* Manage restaurant profile
* Upload restaurant images
* Upload menu images
* Set working hours for each day of the week
* Mark specific days as closed
* View incoming reservation requests
* Approve or reject reservation requests
* Suggest reservation changes
* Mark customers as visited or no-show
* View visited customers
* Rate customers
* View restaurant rating summary

---

## Admin Features

* View dashboard statistics
* Approve or reject restaurant registrations
* Manage restaurants
* Manage customers
* Manage users
* Ban or unban accounts
* View system data

---

# Technologies

## Mobile Application

* React Native
* TypeScript
* React Navigation
* React Native DateTimePicker
* React Native Image Picker

## Backend API

* PHP
* MySQL
* PDO
* Apache
* XAMPP

## Tools

* Visual Studio Code
* Android Studio
* Android Emulator
* phpMyAdmin
* Git / GitHub

---

# Project Structure

```text
reservation-app-thesis/
│
├── mobile/
│   ├── android/
│   ├── ios/
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── reservation-api/
│   ├── auth/
│   ├── config/
│   ├── customers/
│   ├── favorites/
│   ├── helpers/
│   ├── notifications/
│   ├── ratings/
│   ├── reservations/
│   ├── restaurant/
│   └── uploads/
│
└── README.md
```

---

# Requirements

Before running the project, install the following:

## Required Software

* Node.js
* npm
* Android Studio
* Android SDK
* Android Emulator
* XAMPP
* Apache
* MySQL
* PHP
* phpMyAdmin
* Git

---

# Database Setup

The backend uses a MySQL database.

## 1. Start XAMPP

Open XAMPP Control Panel and start:

```text
Apache
MySQL
```

## 2. Open phpMyAdmin

Go to:

```text
http://localhost/phpmyadmin
```

## 3. Create the database

Create a new database, for example:

```text
reservation_app
```

Use `utf8mb4_general_ci` or `utf8mb4_unicode_ci` collation if available.

## 4. Import the SQL file

Import the provided database `.sql` file into the newly created database.

Example:

```text
reservation_app.sql
```

This SQL file should contain all required tables, columns and relationships.

If the repository does not include a database dump, create/export it from the original development database and place it in the project, for example:

```text
database/reservation_app.sql
```

Recommended project structure for the SQL dump:

```text
reservation-app-thesis/
└── database/
    └── reservation_app.sql
```

## 5. Configure database connection

Open:

```text
reservation-api/config/database.php
```

Example configuration:

```php
<?php

$host = "localhost";
$dbname = "reservation_app";
$username = "root";
$password = "";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $e->getMessage()
    ]);
    exit;
}
```

For a default XAMPP installation, the usual credentials are:

```text
username: root
password: empty
```

---

# Backend API Setup

The backend is a plain PHP API.
It must be served through Apache.

## Option 1: Copy API folder to htdocs

Copy the `reservation-api` folder to:

```text
C:/xampp/htdocs/reservation-api
```

Expected result:

```text
C:/xampp/htdocs/reservation-api/
```

Then the API will be available at:

```text
http://localhost/reservation-api/
```

---

## Option 2: Use mklink instead of copying

If you do not want to manually copy the API folder into `htdocs`, you can create a link from `htdocs` to the project folder.

Open Command Prompt as Administrator and run:

```cmd
mklink /J C:\xampp\htdocs\reservation-api C:\path\to\your\project\reservation-api
```

Example:

```cmd
mklink /J C:\xampp\htdocs\reservation-api C:\Users\YourName\Desktop\reservation-app-thesis\reservation-api
```

This keeps the backend inside the Git project, while Apache can still access it through:

```text
http://localhost/reservation-api/
```

This is useful because any changes made inside the project folder will immediately be reflected in XAMPP.

---

## 3. Verify backend API

After Apache and MySQL are running, test an endpoint in the browser:

```text
http://localhost/reservation-api/auth/login.php
```

If the endpoint returns JSON or a request method message, the backend is being served correctly.

---

# Mobile App Setup

Open terminal in the project root and go to the mobile folder:

```bash
cd mobile
```

Install dependencies:

```bash
npm install
```

Start Metro Bundler:

```bash
npx react-native start
```

Open another terminal and run the Android app:

```bash
npx react-native run-android
```

Make sure an Android Emulator is already running from Android Studio.

---

# Running the Full Project

To run the full system:

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Open the project folder:

```bash
cd reservation-app-thesis
```

3. Start XAMPP:

```text
Start Apache
Start MySQL
```

4. Import the database in phpMyAdmin.

5. Configure:

```text
reservation-api/config/database.php
```

6. Place or link `reservation-api` inside:

```text
C:/xampp/htdocs/reservation-api
```

7. Verify backend:

```text
http://localhost/reservation-api/
```

8. Go to mobile folder:

```bash
cd mobile
```

9. Install dependencies:

```bash
npm install
```

10. Start Metro:

```bash
npx react-native start
```

11. Run Android:

```bash
npx react-native run-android
```

---

# API Base URL Explanation

The mobile app uses API URLs like:

```text
http://10.0.2.2/reservation-api/
```

This is required when using Android Emulator.

Explanation:

* `localhost` inside Android Emulator points to the emulator itself.
* `10.0.2.2` points to the host computer.
* XAMPP runs on the host computer.
* Therefore, the emulator accesses the backend through:

```text
http://10.0.2.2/reservation-api/
```

If running the app on a physical Android device, replace `10.0.2.2` with the local IP address of the computer.

Example:

```text
http://192.168.1.10/reservation-api/
```

The phone and computer must be connected to the same network.

---

# Working Hours Logic

During restaurant registration, the restaurant enters one default working schedule, for example:

```text
09:00 - 23:00
```

This schedule is automatically saved for all days:

```text
monday_hours
tuesday_hours
wednesday_hours
thursday_hours
friday_hours
saturday_hours
sunday_hours
```

After registration, the restaurant can edit working hours separately for each day from the restaurant profile.

A day can also be marked as:

```text
Closed
```

The application uses daily working hours for:

* Open / Closed status
* Open Now filter
* Restaurant details display
* Reservation validation
* Preventing reservations on closed days

---

# Reservation Rules

The reservation system checks several conditions before creating a reservation:

* The customer must be logged in.
* The customer must not be banned.
* The restaurant must exist.
* The selected day must not be closed.
* The selected time must be inside the allowed reservation window.
* The restaurant must have available capacity.
* The customer must not exceed reservation limits.
* The customer must not already have conflicting reservations.

## Working hours reservation buffer

Reservations are allowed only:

* 3 hours after restaurant opening
* 3 hours before restaurant closing

Example:

```text
Restaurant working hours: 09:00 - 23:00
Allowed reservation window: 12:00 - 20:00
```

This rule is validated both in the mobile app and in the backend API.

---

# Important Backend Folders

## auth

Handles login, registration and account status checks.

Examples:

```text
reservation-api/auth/login.php
reservation-api/auth/register-customer.php
reservation-api/auth/register-restaurant.php
reservation-api/auth/check-user-status.php
```

## restaurant

Handles restaurant profile, approved restaurants, images and updates.

Examples:

```text
reservation-api/restaurant/get-approved-restaurants.php
reservation-api/restaurant/get-restaurant-profile.php
reservation-api/restaurant/update-restaurant-profile.php
reservation-api/restaurant/upload-restaurant-image.php
reservation-api/restaurant/upload-menu-image.php
```

## reservations

Handles reservation creation, availability and status changes.

Examples:

```text
reservation-api/reservations/create-reservation.php
reservation-api/reservations/check-availability.php
reservation-api/reservations/update-reservation-status.php
```

## ratings

Handles customer-to-restaurant and restaurant-to-customer ratings.

## notifications

Handles reservation-related notifications.

## favorites

Handles customer favorite restaurants.

## helpers

Contains shared helper functions used by the backend.

---

# Image Uploads

The system supports image uploads for:

* restaurant images
* menu images

Supported formats:

```text
JPG
JPEG
PNG
```

Make sure the backend upload directories exist and are writable.

Recommended folders:

```text
reservation-api/uploads/restaurants/
reservation-api/uploads/menus/
```

If images are not uploading, check folder permissions and backend paths.

---

# No-show and Trust Score

The system includes customer trust tracking.

Restaurants can mark a reservation as:

```text
Visited
No-show
```

If a customer receives no-show reports, the trust score is reduced.
After reaching the defined no-show limit, the customer account can be banned.

This helps restaurants identify unreliable customers and reduce reservation abuse.

---

# Common Issues

## Backend is not working

Check:

* Apache is running
* MySQL is running
* `reservation-api` is inside `htdocs` or linked with `mklink`
* Database credentials are correct
* Database is imported
* API URL is correct

Test:

```text
http://localhost/reservation-api/
```

---

## Mobile app cannot connect to backend

Check that the mobile app uses:

```text
http://10.0.2.2/reservation-api/
```

for Android Emulator.

For physical device, use the computer IP address instead.

---

## Database connection failed

Check:

```text
reservation-api/config/database.php
```

Make sure:

* database name is correct
* username is correct
* password is correct
* MySQL is running

---

## Images are not showing

Check:

* upload folder exists
* image path is saved correctly in database
* Apache can access the upload folder
* image URL uses correct base path

---

## Changes in backend are not visible

If using copied backend in `htdocs`, make sure you edited the same files that Apache is serving.

Recommended solution:

Use `mklink`:

```cmd
mklink /J C:\xampp\htdocs\reservation-api C:\path\to\project\reservation-api
```

This ensures that editing the project folder also updates the backend served by Apache.

---

# Git Notes

Recommended workflow:

```bash
git status
git add .
git commit -m "Update README and setup instructions"
git push
```

Do not commit sensitive credentials.

---

# Notes for Reviewers

To run the project successfully, both parts must be configured:

1. PHP backend must be served through Apache/XAMPP.
2. MySQL database must be imported.
3. React Native mobile application must be started separately.
4. Android Emulator must access backend through `10.0.2.2`.

---

# Author

Darko Mitovski

Bachelor Thesis Project
Software Engineering and Innovation
Restaurant Reservation System
