import React from "react";
import Logo from "../assets/Logo.png";
import Navbar from "./Navbar";

const Header = ({
  movieFilter,
  handleMovieFilter,
}: {
  movieFilter: string;
  handleMovieFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <header className="w-full flex flex-col items-center justify-center gap-6 p-6 bg-gray-900 text-center shadow-md">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-10">
        <img src={Logo} alt="Muvi logo" className="w-40 md:w-48" />
        <Navbar />
      </div>
      <form className="w-full max-w-md">
        <input
          type="text"
          name="movieFilter"
          placeholder="Search for a movie..."
          value={movieFilter}
          onChange={(e) => handleMovieFilter(e)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
        />
      </form>
    </header>
  );
};

export default Header;
