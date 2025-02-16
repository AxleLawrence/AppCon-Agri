require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

let db;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies
  })
);
app.use(cookieParser());

// Connect to Database
async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "signup",
      port: 3306,
    });

    console.log("✅ Connected to MariaDB!");
    return db;
  } catch (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  }
}

connectDB();

// ✅ Signup Route
app.post("/api/signup", async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!db) return res.status(500).json({ error: "Database not connected" });

  try {
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length > 0)
      return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)",
      [fullname, email, hashedPassword]
    );

    res.json({ message: "Signup successful" });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Login Route
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    console.log("Login attempt:", email); // ✅ Debugging

    if (!db) {
        console.error("❌ Database not connected!");
        return res.status(500).json({ error: "Database not connected" });
    }

    try {
        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        console.log("User found in DB:", users);

        if (users.length === 0) {
            console.error("❌ User not found");
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            console.error("❌ Incorrect password");
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, "your_jwt_secret", { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ error: "Server error. Try again later." });
    }
});


// ✅ Logout Route
app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// Serve React app in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Express server is running inside React project!");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
