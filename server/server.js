const db = require("./database");

const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "Movie Discovery API is running",
  });
});

// ===============================
// SEARCH MOVIES - OMDb API
// ===============================

app.get("/api/movies", async (req, res) => {
  try {
    const query = req.query.query || "Avengers";

    const response = await axios.get(
      "https://www.omdbapi.com/",
      {
        params: {
          apikey: process.env.OMDB_API_KEY,
          s: query,
          type: "movie",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Movie search error:", error.message);

    res.status(500).json({
      error: "Failed to fetch movies",
    });
  }
});

// ===============================
// WISHLIST ROUTES
// ===============================

// GET all wishlist movies
app.get("/api/wishlist", (req, res) => {
  try {
    const movies = db
      .prepare(`
        SELECT
          movie_id AS imdbID,
          title,
          poster_path AS poster,
          release_date AS year
        FROM wishlist
        ORDER BY created_at DESC
      `)
      .all();

    res.json(movies);
  } catch (error) {
    console.error("Wishlist GET error:", error);

    res.status(500).json({
      error: "Failed to fetch wishlist",
    });
  }
});

// POST - Add movie to wishlist
app.post("/api/wishlist", (req, res) => {
  try {
    const {
      imdbID,
      title,
      year,
      poster,
    } = req.body;

    if (!imdbID || !title) {
      return res.status(400).json({
        error: "imdbID and title are required",
      });
    }

    const result = db
      .prepare(`
        INSERT OR IGNORE INTO wishlist
        (movie_id, title, poster_path, release_date)
        VALUES (?, ?, ?, ?)
      `)
      .run(
        imdbID,
        title,
        poster || null,
        year || null
      );

    res.json({
      message: result.changes
        ? "Movie added to wishlist"
        : "Movie already in wishlist",
    });
  } catch (error) {
    console.error("Wishlist POST error:", error);

    res.status(500).json({
      error: "Failed to add movie to wishlist",
    });
  }
});

// DELETE - Remove movie from wishlist
app.delete("/api/wishlist/:movieId", (req, res) => {
  try {
    const movieId = req.params.movieId;

    db.prepare(
      "DELETE FROM wishlist WHERE movie_id = ?"
    ).run(movieId);

    res.json({
      message: "Movie removed from wishlist",
    });
  } catch (error) {
    console.error("Wishlist DELETE error:", error);

    res.status(500).json({
      error: "Failed to remove movie from wishlist",
    });
  }
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});