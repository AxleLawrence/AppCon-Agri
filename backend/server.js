const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Enable CORS
app.use(cors());

// Enable Express to parse JSON
app.use(express.json());

// API route
app.get("/", (req, res) => {
    res.send("Express server is running inside React project!");
});

// Serve React app in production
if (process.env.NODE_ENV === "production") {
    // Serve static files from React app
    app.use(express.static(path.join(__dirname, "../build")));

    // Handle all other routes and return the React app
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
