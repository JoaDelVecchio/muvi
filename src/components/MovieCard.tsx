import { Movie as MovieType } from "../types/types";

const MovieCard = ({ movie }: { movie: MovieType }) => {
  const onFavoriteClick = () => {
    alert("clicked");
  };

  return (
    <div className="h-80 bg-gray-800 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
      <img
        src={movie.url}
        alt={movie.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
        <button
          onClick={onFavoriteClick}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Favorite
        </button>
      </div>
      <p className="text-gray-400 mt-2">{movie.release_date}</p>
    </div>
  );
};

export default MovieCard;
