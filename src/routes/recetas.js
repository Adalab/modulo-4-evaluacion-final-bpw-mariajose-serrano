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

// POST /recetas -> crea una receta (con ingredientes opcionales)
router.post("/", async (req, res) => {
  const { title, instructions, time_minutes, ingredients } = req.body;

  // Validación mínima
  if (!title || title.trim() === "") {
    return res.status(400).json({ ok: false, error: "title es obligatorio" });
  }

  // ingredients puede ser undefined o un array
  const ingredientsList = Array.isArray(ingredients) ? ingredients : [];

  let conn;
  try {
    conn = await db.getConnection();
    await conn.beginTransaction();

    // 1) Insertar receta
    const [resultReceta] = await conn.query(
      "INSERT INTO recetas (title, instructions, time_minutes) VALUES (?, ?, ?)",
      [title.trim(), instructions || null, time_minutes || null]
    );

    const recetaId = resultReceta.insertId;

    // 2) Si vienen ingredientes, aseguramos que existan y creamos relaciones
    for (const ing of ingredientsList) {
      if (!ing?.name || ing.name.trim() === "") continue;

      const name = ing.name.trim();
      const quantity = ing.quantity ? String(ing.quantity).trim() : null;

      // Crear ingrediente si no existe
      await conn.query(
        "INSERT INTO ingredientes (name) VALUES (?) ON DUPLICATE KEY UPDATE name = name",
        [name]
      );

      // Obtener id del ingrediente
      const [rowsIng] = await conn.query(
        "SELECT id FROM ingredientes WHERE name = ?",
        [name]
      );
      const ingredienteId = rowsIng[0].id;

      // Relación receta-ingrediente
      await conn.query(
        `INSERT INTO receta_ingrediente (receta_id, ingrediente_id, quantity)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE quantity = VALUES(quantity)`,
        [recetaId, ingredienteId, quantity]
      );
    }

    await conn.commit();
    res.status(201).json({ ok: true, id: recetaId });
  } catch (error) {
    if (conn) await conn.rollback();
    res.status(500).json({ ok: false, error: error.message });
  } finally {
    if (conn) conn.release();
  }
});
