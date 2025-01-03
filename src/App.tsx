import React, { useEffect } from "react";
import Fuse from "fuse.js";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getPopularMovies } from "./services/api";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        if (!popularMovies) {
          throw new Error("Error fetching movies");
        }
        setMovies(popularMovies);
      } catch (error) {
        console.error("Server Error", error);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const [movieFilter, setMovieFilter] = useState<string>("");

  const options = {
    keys: ["title"],
    threshold: 0.4,
  };

  const fuse = new Fuse(movies, options);

  const handleMovieFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMovieFilter(e.target.value);
  };

  const filteredMovies = movieFilter
    ? fuse.search(movieFilter).map((result) => result.item)
    : movies;

  return (
    <div className="flex justify-between min-h-screen bg-gray-900 text-white flex-col items-center">
      <Header movieFilter={movieFilter} handleMovieFilter={handleMovieFilter} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <main className="flex h-full">
          <p className="font-black text-lg text-red-500">{error}</p>
          <Routes>
            <Route
              path="/"
              element={<Home filteredMovies={filteredMovies} />}
            />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      )}
      <Footer />
    </div>
  );
}

export default App;
