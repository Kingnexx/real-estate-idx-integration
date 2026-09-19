// backend/server.js
const express = require("express");
const cors = require("cors");
const db = require("./database");


const path = require("path");


const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Helper: load Active properties directly from the database
function loadProperties() {
  const stmt = db.prepare("SELECT * FROM properties WHERE status = ?");
  return stmt.all("Active");
}

// GET /api/properties  -> all properties, with optional filters
app.get("/api/properties", (req, res) => {
  const { city, minPrice, maxPrice, minBeds } = req.query;

  // Validate numeric filters — reject anything that isn't a valid number
  const numericFilters = { minPrice, maxPrice, minBeds };
  for (const [key, value] of Object.entries(numericFilters)) {
    if (value !== undefined && isNaN(Number(value))) {
      return res.status(400).json({ error: `${key} must be a valid number` });
    }
  }

  const stmt = db.prepare("SELECT * FROM properties WHERE status = ?");
  let properties = stmt.all("Active");

  if (city && city.trim() !== "") {
    properties = properties.filter((p) =>
      p.city.toLowerCase().includes(city.toLowerCase())
    );
  }
  if (minPrice) properties = properties.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) properties = properties.filter((p) => p.price <= Number(maxPrice));
  if (minBeds) properties = properties.filter((p) => p.beds >= Number(minBeds));

  res.json(properties);
});

// GET /api/properties/:id -> a single property
app.get("/api/properties/:id", (req, res) => {
  const properties = loadProperties();
  const property = properties.find((p) => p.id === req.params.id);

  if (!property) {
    return res.status(404).json({ error: "Property not found" });
  }

  res.json(property);
});

app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});