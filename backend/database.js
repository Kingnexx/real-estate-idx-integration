// backend/database.js
const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "database.db"));

// Create the properties table if it doesn't already exist
db.exec(`
  CREATE TABLE IF NOT EXISTS properties (
    id TEXT PRIMARY KEY,
    price INTEGER,
    beds INTEGER,
    baths INTEGER,
    sqft INTEGER,
    city TEXT,
    state TEXT,
    address TEXT,
    remarks TEXT,
    status TEXT,
    image TEXT
  )
`);

module.exports = db;