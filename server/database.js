const Database = require("better-sqlite3");

const db = new Database("movies.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS wishlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    poster_path TEXT,
    release_date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

module.exports = db;