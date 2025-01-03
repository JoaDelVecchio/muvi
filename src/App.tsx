import React from "react";
import Fuse from "fuse.js";
import { useState } from "react";
import { Movie as MovieType } from "./types/types";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [movies] = useState<MovieType[]>([
    {
      id: 1,
      title: "Tims film",
      release_date: "2020",
      url: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Joa film",
      release_date: "2022",
      url: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Pepe film",
      release_date: "2021",
      url: "https://via.placeholder.com/150",
    },
  ]);

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
    <div className="min-h-screen h-full bg-gray-900 text-white flex flex-col items-center">
      <Header movieFilter={movieFilter} handleMovieFilter={handleMovieFilter} />
      <Routes>
        <Route path="/" element={<Home filteredMovies={filteredMovies} />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
