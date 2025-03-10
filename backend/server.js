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
app.use(express.urlencoded({ extended: true }));
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
      database: "appcondb",
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
  const { number, fullname, password, otp } = req.body;

  if (!db) return res.status(500).json({ error: "Database not connected" });

  if (!/^\d{11}$/.test(number)) {
    return res.status(400).json({ error: "Invalid mobile number format" });
  }
  if (fullname.trim().length < 3 || fullname.trim().length > 100) {
    return res.status(400).json({ error: "Name must be between 3-100 characters." });
  }  
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long" });
  }
  if (!/^\d{6}$/.test(otp)) {
    return res.status(400).json({ error: "Invalid OTP format" });
  }

  try {
    const [existingUsers] = await db.execute("SELECT * FROM users WHERE number = ?", [number]);
    if (existingUsers.length > 0)
      return res.status(400).json({ error: "Mobile number already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      "INSERT INTO users (number, fullname, password, otp) VALUES (?, ?, ?, ?)",
      [number, fullname, hashedPassword, otp]
    );

    res.json({ message: "Signup successful!" });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ Login Route
app.post("/api/login", async (req, res) => {
  console.log("Received login request body:", req.body);

  const { number, password } = req.body;

  if (!number || !password) {
    return res.status(400).json({ error: "Phone number and password are required" });
  }

  try {
    const [users] = await db.execute("SELECT * FROM users WHERE number = ?", [number]);

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

      const user = users[0];
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch);

      if (!isMatch) {
          console.error("❌ Incorrect password");
          return res.status(401).json({ error: "Invalid phone number or password" });
      }

      const token = jwt.sign(
          { id: user.id, number: user.number },
          "your_jwt_secret",
          { expiresIn: "1h" } // Increased expiry time
      );
      res.cookie("token", token, { httpOnly: true });

      res.json({ message: "Login successful", token });
  } catch (error) {
      console.error("❌ Login error:", error);
      res.status(500).json({ error: "Server error. Try again later." });
  }
});



// ✅ Logout Route
app.post("/api/logout", (req, res) => {
  res.clearCookie("token"); // ✅ Clear auth cookie
  return res.json({ message: "Logged out successfully" });
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
