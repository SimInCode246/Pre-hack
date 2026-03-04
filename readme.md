# 🏠 Affordable Housing Finder

A sophisticated web application designed to bridge the gap between financial reality and real estate discovery. This platform helps users find homes that are truly affordable by integrating **PMAY (Pradhan Mantri Awas Yojana)** eligibility logic and real-time income-to-rent calculations.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Database](https://img.shields.io/badge/database-MySQL-orange)
![Environment](https://img.shields.io/badge/server-localhost-lightgrey)

---

## 🚀 Key Features

* **Affordability Engine**: Recommends rent that doesn't exceed 30% of the user's monthly income.
* **Government Scheme Integration**: Built-in logic to check for **PMAY (EWS/LIG/MIG)** eligibility.
* **Interactive Mapping**: Real-time property visualization using **Leaflet.js** and OpenStreetMap.
* **Full-Stack Connectivity**: Configured to fetch and store persistent property data.
* **Modern UI/UX**: Features glassmorphism, smooth CSS animations, and a functional **Dark Mode**.

---

## 🛠️ Tech Stack

* **Frontend**: Vanilla JavaScript (ES6+), HTML5, Tailwind CSS
* **Mapping**: Leaflet.js
* **Backend**: Node.js / Express (or similar REST API)
* **Database**: **MySQL** (Running on `localhost`)
* **Persistence**: JWT Authentication & LocalStorage

---

## 🔌 Database & API Configuration

The application is designed to interface with a **MySQL Database** hosted on `localhost`. 

### Localhost Setup
* **Endpoint**: `http://localhost:8080/api`
* **Data Source**: MySQL
* **Tables**: The schema includes tables for `users`, `properties`, and `saved_favorites`.

To point the app to a different local port or a production server, update the `apiEndpoint` in the state:
```javascript
const state = {
  apiEndpoint: "http://localhost:YOUR_PORT/api",
  // ...
};
