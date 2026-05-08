# NotesApp

A full-stack note-taking application built with a React frontend and a Node.js/Express backend.

## Features

-   User registration and login
-   Create, view, and delete notes
-   Secure authentication using JWT
-   Responsive design for use on different devices

## Tech Stack

-   **Frontend**: React, Vite, Tailwind CSS
-   **Backend**: Node.js, Express
-   **Database**: SQLite
-   **Authentication**: JSON Web Tokens (JWT)

## Project Structure

```
NotesApp/
├── Backend/
│   ├── controller/
│   ├── middleware/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── pages/
    │   └── App.jsx
    └── package.json
```

## Installation and Setup

To get the application running locally, follow these steps:

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd NotesApp
```

### 2. Backend Setup

```bash
cd Backend
npm install
npm start
```

The backend server will start on `http://localhost:5000`.

### 3. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend development server will start on `http://localhost:5173` (or another available port).

## Usage

1.  Open your browser and navigate to the frontend URL.
2.  Register for a new account or log in with existing credentials.
3.  Start creating and managing your notes.

## Deployment

This application is configured to be deployed as a single unit.

1.  **Build the frontend:**
    ```bash
    cd frontend
    npm run build
    ```
2.  The Node.js backend is pre-configured to serve the built frontend files from the `frontend/dist` directory.
3.  Deploy the `Backend` folder to a hosting service like Render or Heroku, setting the root directory to `NotesApp/Backend`.
    -   **Build Command**: `npm install`
    -   **Start Command**: `npm start`
