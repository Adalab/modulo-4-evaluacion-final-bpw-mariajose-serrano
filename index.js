const express = require("express");
const cors = require("cors");
const recetasRoutes = require("./src/routes/recetas");

require("dotenv").config();

const db = require("./src/db");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ ok: true, message: "API de recetas funcionando" });
});

app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS sum");
    res.json({ ok: true, rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.use("/recetas", recetasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
