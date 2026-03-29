# Affordable Housing Finder - Setup Guide

This guide explains how to start and run your project securely by yourself at any time.

## Prerequisites

Before starting, ensure you have the following installed on your computer:
- **Node.js** (LTS version)
- **A modern web browser** (Chrome, Edge, Firefox, etc.)

---

## Step 1: Start the Backend Server
Your backend (`server.js`) connects to the MongoDB Atlas live database and serves data to your website.

1. Open your terminal or VS Code terminal.
2. Navigate to your project folder:
   ```bash
   cd " Address of the project folder directory eg--C:\Users\lokesh verma\OneDrive\Desktop\PROJECT 1"
   ```
3. Start the Node.js server:
   ```bash
   node server.js
   ```
4. You should see a message in the terminal saying:
   `Listening on port 8080`
   `Connected to MongoDB Database.`

*(Keep this terminal window open. If you close it, your server shuts down and the site loses database access).*

---

## Step 2: Open the Frontend Website
Your website's user interface is built entirely in an HTML file (`website.html`).

1. Open your File Explorer.
2. Go to root folder of the project and open the file "website.html".
3. Simply **double-click** the `website.html` file.
   - It will open automatically in your default internet browser (e.g. Chrome).
   - *Alternatively, you can drag and drop the file into an open browser tab.*

---

## How it All Connects (Behind the Scenes)

- **Database**: Your data is living securely in the cloud via **MongoDB Atlas**. Whenever you start `server.js`, it reads your strict database connection string out of your hidden `.env` file to establish the handshake.
- **Backend API**: Running `node server.js` boots up an Express API on your local port `8080`.
- **Frontend App**: When you open `website.html` in your browser, its JavaScript looks for the backend exactly at `http://localhost:8080/api` to verify logins and fetch property listings.

---

## Troubleshooting

- **"No Properties Found" / "API Error"**
  - Your `server.js` backend is likely not running. Go back to your terminal, press `CTRL + C` to force stop any broken tasks, and type `node server.js` again.
- **Map isn't showing new cities**
  - You likely need to refresh `website.html` in your browser by pressing `F5` so it fetches the newest property coordinates from the backend.
