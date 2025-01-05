import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Local imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { getPopularMovies, searchMovies } from "./services/api";
import { Movie } from "./types/types";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]); // Películas populares
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]); // Películas buscadas
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [movieFilter, setMovieFilter] = useState<string>("");
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

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

  const handleMovieFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMovieFilter(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (movieFilter.trim() === "") {
      // If search input is empty, reset to show popular movies
      setSearchedMovies([]);
      return;
    }

    try {
      const moviesSearched = await searchMovies(movieFilter);
      setSearchedMovies(moviesSearched); // Update searched movies
    } catch (err) {
      console.error("Search Error:", err);
      setError("Failed to search movies. Please try again.");
    }

    setMovieFilter(""); // Clear the search input field
  };

  const handleFavoriteMovieClick = (id: number) => {
    setFavoriteMovies((prevMovies) => {
      const isFavorite = prevMovies.some((favMovie) => favMovie.id === id);

      if (isFavorite) {
        // Remove from favorites
        return prevMovies.filter((favMovie) => favMovie.id !== id);
      } else {
        // Find the movie in either `movies` or `searchedMovies`
        const movie =
          movies.find((movie) => movie.id === id) ||
          searchedMovies.find((movie) => movie.id === id);

        if (!movie) {
          console.error(`Movie with id ${id} not found.`);
          return prevMovies;
        }

        // Add to favorites
        return [...prevMovies, movie];
      }
    });
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
                  movies={movies}
                  searchedMovies={searchedMovies}
                  favoriteMovies={favoriteMovies}
                  handleFavoriteMovieClick={handleFavoriteMovieClick}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favoriteMovies={favoriteMovies}
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
