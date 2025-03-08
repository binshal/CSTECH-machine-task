# MERN Lead Distribution App

A full-stack MERN (MongoDB, Express, Next.js, Node.js) application for managing agents and distributing leads. This app allows an admin to log in, manage agents, upload CSV files containing lead information, and view the leads distribution among agents.

## Overview

This application is designed to help administrators manage agents and distribute leads efficiently. The admin can create agents, upload CSV files containing lead data, and the app will automatically assign the leads evenly among the available agents.

## Technologies Used

- **Frontend:** Next.js with Tailwind CSS
- **Backend:** Node.js and Express
- **Database:** MongoDB (using Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer for file uploads and csv-parse for parsing CSV files

## Getting Started

### Prerequisites

- Node.js (v12 or higher recommended)
- MongoDB installed and running locally or via a cloud provider
- npm (Node Package Manager)

### Installation

1. **Extract the zip file or git clone:**

   ```bash
   Open the folder in Vs code or your preferred code editor
   ```

2. **Install and Run the Backend:**

   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Install and Run the Frontend:**

   Open a new terminal (keep the backend running) and navigate to the client directory:

   ```bash
   cd client
   npm install
   npm run dev
   ```

### Running the Application

- **Backend Server:** Runs on [http://localhost:5000](http://localhost:5000)
- **Frontend Application:** Runs on [http://localhost:3000](http://localhost:3000)

## Seeding Admin Credentials

The default admin credentials are seeded via the `seedAdmin.js` script located in the **server** directory. The default admin credentials are:

- **Email:** `admin@gmail.com`
- **Password:** `admin123`

**To seed or update the admin user:**

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Run the seeding script:

   ```bash
   node seedAdmin.js
   ```

3. (Optional) Edit the `seedAdmin.js` file to change the default credentials, then re-run the script.

## Application Usage

### Admin Login

1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
2. Use the admin credentials from `seedAdmin.js` to log in.

### Agent Management

- Navigate to the `/agent` route or click **Agents** in the navigation bar.
- **Add Agents:** Provide the agent’s name, email, mobile, and password.
- **Edit/Delete Agents:** Use the respective buttons next to each agent in the agents list.

### Uploading Leads

1. Navigate to the **Upload Leads** page (either via the navigation bar or directly at `/upload`).
2. Click on the "Choose File" button to select your CSV file.
3. Click **Upload**.
4. On success, you should see the message: "Leads uploaded and distributed".

### Viewing Lead Distribution

- Navigate to the **Lead Distribution** page via the navigation bar or directly at `/distribution`.
- A table displays the uploaded leads along with their details and the agent they have been assigned to. Leads are evenly distributed among all agents.

## CSV File Format

The CSV file should have the following headers:

- **FirstName:** The lead’s first name.
- **Phone:** The lead’s phone number.
- **Notes:** Additional notes about the lead.

**Sample CSV File:**

```csv
FirstName,Phone,Notes
John,1234567890,Interested in product A
Jane,2345678901,Follow up next week
Alice,3456789012,Requested pricing details
Bob,4567890123,New inquiry from website
Charlie,5678901234,Left voicemail
```

Place the sample CSV file in the repository root or use your own file following the same format.

## Additional Notes

- **MongoDB Connection:** Ensure MongoDB is running before starting the backend.
- **Environment Variables:** Configure your `.env` file in the server directory with the proper `MONGO_URI`, `PORT`, and `JWT_SECRET`.
- **File Upload Folder:** The server uses an `uploads` folder to temporarily store CSV files. This folder is automatically created if it doesn’t exist.
- **Error Handling:** Check the server console for detailed error messages if something goes wrong (e.g., incorrect CSV format, no agents available, etc.).

---

This README provides a clear, professional guide to installing, running, and using the MERN App.