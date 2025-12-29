const express = require("express");
const db = require("../db");

const router = express.Router();

// GET /recetas -> lista todas las recetas
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, title, instructions, time_minutes, created_at FROM recetas ORDER BY id DESC"
    );
    res.json({ ok: true, data: rows });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

module.exports = router;
