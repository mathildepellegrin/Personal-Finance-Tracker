const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required" });
  }

  try {
    // Check if user already exists (by username OR email)
    db.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, email], async (err, results) => {
      if (err) return res.status(500).json({ error: "DB error" });
      if (results.length > 0) {
        return res.status(400).json({ error: "Username or email already taken" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err2, result) => {
          if (err2) return res.status(500).json({ error: "DB insert error" });
          res.json({ message: "User registered successfully" });
        }
      );
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Save user session
    req.session.userId = user.id;

    res.json({
      message: "Login successful",
      user: { id: user.id, username: user.username, email: user.email }
    });
  });
});

// LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: "Could not log out" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful" });
  });
});

module.exports = router;
