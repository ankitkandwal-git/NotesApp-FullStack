
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require('fs');
const setupFrontend = require("./middleware-serve-frontend");
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize DB (creates tables if needed)
require('./db');

app.use(express.json());

const corsOptions = process.env.CORS_ORIGIN
    ? { origin: process.env.CORS_ORIGIN.split(',').map((s) => s.trim()) }
    : undefined;
app.use(cors(corsOptions));

app.use('/auth', require('./routes/auth.routes'));
app.use('/notes', require('./routes/notes.routes'));

// Serve built frontend only when present
const distIndex = path.join(__dirname, '../frontend/dist/index.html');
if (fs.existsSync(distIndex)) {
    setupFrontend(app);
}

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}/`);
});