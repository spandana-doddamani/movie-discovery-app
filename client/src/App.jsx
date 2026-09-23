import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [search, setSearch] = useState("Guardians of the Galaxy");
const [movies, setMovies] = useState([]);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const [wishlist, setWishlist] = useState([]);

  // Search movies
  const searchMovies = async () => {
  if (!search.trim()) return;

  try {
    setLoading(true);
    setError("");

    const response = await axios.get(
      `${API_URL}/api/movies?query=${encodeURIComponent(search)}`
    );

    setMovies(response.data.Search || []);
  } catch (error) {
    console.error(error);
    setError("Failed to fetch movies");
    setMovies([]);
  } finally {
    setLoading(false);
  }
};

  // Get wishlist
  const getWishlist = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/wishlist`);
      setWishlist(response.data);
    } catch (err) {
      console.error("Failed to load wishlist:", err);
    }
  };

  // Add movie to wishlist
  const addToWishlist = async (movie) => {
    const alreadyAdded = wishlist.some(
      (item) => item.imdbID === movie.imdbID
    );

    if (alreadyAdded) {
      alert("Movie is already in your wishlist.");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/wishlist`, {
        imdbID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      });

      await getWishlist();
    } catch (err) {
      console.error("Failed to add movie:", err);
      alert("Could not add movie to wishlist.");
    }
  };

  // Remove movie from wishlist
  const removeFromWishlist = async (imdbID) => {
    try {
      await axios.delete(`${API_URL}/api/wishlist/${imdbID}`);
      await getWishlist();
    } catch (err) {
      console.error("Failed to remove movie:", err);
    }
  };

  // Load wishlist when page opens
  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header>
        <h1>🎬 Movie Discovery App</h1>
        <p>Search for movies and save your favorites to your wishlist.</p>

        <div className="search-box">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchMovies();
              }
            }}
            placeholder="Search for a movie..."
          />

          <button onClick={searchMovies} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </header>

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Search Results */}
<h2>Search Results</h2>

{loading ? (
  <p className="status">Loading movies...</p>
) : movies.length === 0 ? (
  <p className="status">No movies found. Try another search.</p>
) : (
  <div className="movie-grid">
    {movies.map((movie) => (
      <div className="movie-card" key={movie.imdbID}>
        {movie.Poster && movie.Poster !== "N/A" ? (
          <img src={movie.Poster} alt={movie.Title} />
        ) : (
          <div className="no-poster">No Image</div>
        )}

        <div className="movie-info">
          <h2>{movie.Title}</h2>
          <p>Year: {movie.Year}</p>

          <button
            className="wishlist-button"
            onClick={() => addToWishlist(movie)}
          >
            ❤️ Add to Wishlist
          </button>
        </div>
      </div>
    ))}
  </div>
)}

      {/* Wishlist */}
      <hr />

      <h2>❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="status">Your wishlist is empty.</p>
      ) : (
        <div className="movie-grid">
          {wishlist.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              {movie.poster && movie.poster !== "N/A" ? (
                <img
  src={
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster"
  }
  alt={movie.Title}
  onError={(e) => {
    e.target.src =
      "https://via.placeholder.com/300x450?text=No+Poster";
  }}
/>
              ) : (
                <div className="no-poster">No Image</div>
              )}

              <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>Year: {movie.year}</p>

                <button
                  className="wishlist-button"
                  onClick={() => removeFromWishlist(movie.imdbID)}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;