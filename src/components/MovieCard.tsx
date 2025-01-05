import { Movie as MovieType } from "../types/types";

const MovieCard = ({
  movie,
  handleFavoriteMovieClick,
  isFavorite,
}: {
  movie: MovieType;
  isFavorite: boolean;
  handleFavoriteMovieClick: (id: number) => void;
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex flex-col">
      {/* Image */}
      <div className="mb-4 w-full">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="object-cover rounded-md "
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow justify-between items-center w-full">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white text-center break-words mb-4">
          {movie.title}
        </h3>

        {/* Release Date */}
        <p className="text-gray-400 text-sm sm:text-base text-center mb-4">
          {movie.release_date.split("-")[0]}
        </p>

        {/* Button */}
        <button
          onClick={() => handleFavoriteMovieClick(movie.id)}
          className="px-4 py-2 text-white rounded-md w-full sm:w-auto bg-blue-500 hover:bg-blue-600 active:bg-blue-900 transition"
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
