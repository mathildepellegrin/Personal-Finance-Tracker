//imports
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all expenses
//by descending dates
router.get("/", (req, res) => {
  db.query("SELECT * FROM expenses ORDER BY date DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST new expense
router.post("/", (req, res) => {
  const { date, category, amount, description } = req.body;
  db.query(
    "INSERT INTO expenses (date, category, amount, description) VALUES (?, ?, ?, ?)",
    [date, category, amount, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, date, category, amount, description });
    }
  );
});

module.exports = router;