import { Movie as MovieType } from "../types/types";

const MovieCard = ({ movie }: { movie: MovieType }) => {
  const onFavoriteClick = () => {
    alert("clicked");
  };

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
          onClick={onFavoriteClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
        >
          Favorite
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
