// backend/importProperties.js
const fs = require("fs");
const path = require("path");
const db = require("./database");
const { mapListings } = require("./mapper");

// Load and map the raw MLS data
const filePath = path.join(__dirname, "mlsRawData.json");
const raw = fs.readFileSync(filePath, "utf-8");
const rawListings = JSON.parse(raw);
const mapped = mapListings(rawListings);

// Prepare an INSERT statement (reused for every row — much faster than rebuilding it each time)
const insert = db.prepare(`
  INSERT OR REPLACE INTO properties
  (id, price, beds, baths, sqft, city, state, address, remarks, status, image)
  VALUES (@id, @price, @beds, @baths, @sqft, @city, @state, @address, @remarks, @status, @image)
`);

// Insert every mapped listing (including Pending ones — filtering happens at query time, not import time)
const insertMany = db.transaction((listings) => {
  for (const listing of listings) {
    insert.run(listing);
  }
});

insertMany(mapped);

console.log(`Imported ${mapped.length} properties into database.db`);