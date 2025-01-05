import React, { useEffect, useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Fuse from "fuse.js";

// Local imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { getPopularMovies, searchMovies } from "./services/api";
import { Movie } from "./types/types";

function App() {
  // State variables
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [movieFilter, setMovieFilter] = useState<string>("");
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  // Fuse.js configuration
  const fuseOptions = useMemo(
    () => ({
      keys: ["title"],
      threshold: 0.4,
    }),
    []
  );

  const fuse = useMemo(
    () => new Fuse(movies, fuseOptions),
    [movies, fuseOptions]
  );

  // Fetch popular movies on mount
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        if (!popularMovies) {
          throw new Error("Error fetching movies");
        }
        setMovies(popularMovies);
      } catch (err) {
        console.error("Server Error:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  // Filter movies based on user input
  const filteredMovies = movieFilter
    ? fuse.search(movieFilter).map((result) => result.item)
    : movies;

  // Handlers
  const handleMovieFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMovieFilter(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const moviesSearched = await searchMovies(movieFilter);
    setMovies(moviesSearched);
    setMovieFilter("");
  };

  const handleFavoriteMovieClick = (id: Number) => {
    const movie = movies.find((movie) => movie.id === id);
    if (!movie) {
      return console.error("Error adding movie to favorites");
    }
    setFavoriteMovies((prevMovies) => [...prevMovies, movie]);
  };

  return (
    <div className="flex justify-between min-h-screen bg-gray-900 text-white flex-col items-center">
      <Header
        movieFilter={movieFilter}
        handleMovieFilter={handleMovieFilter}
        handleSubmit={handleSubmit}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <main className="flex flex-col items-center justify-between h-full">
          {error && (
            <div className="font-black text-lg text-red-600">{error}</div>
          )}
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  filteredMovies={filteredMovies}
                  handleFavoriteMovieClick={handleFavoriteMovieClick}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favoritesMovies={favoriteMovies}
                  handleFavoriteMovieClick={handleFavoriteMovieClick}
                />
              }
            />
          </Routes>
        </main>
      )}
      <Footer />
    </div>
  );
}

export default App;
