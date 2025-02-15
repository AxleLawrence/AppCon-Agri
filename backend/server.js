const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql");

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// API routes
app.get("/api", (req, res) => {
    res.json({ message: "This is the API response" });
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup",
})


// Serve React app in production
if (process.env.NODE_ENV === "production") {
    // Serve static files from React app (after building the React app)
    app.use(express.static(path.join(__dirname, "../build")));

    // Handle all other routes and return the React app (for client-side routing with React Router)
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../build", "index.html"));
    });
} else {
    // In development, fallback to React's dev server
    app.get("/", (req, res) => {
        res.send("Express server is running inside React project!");
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
