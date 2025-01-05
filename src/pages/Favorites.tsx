import MovieCard from "../components/MovieCard";
import { Movie } from "../types/types";

const Favorites = ({
  favoritesMovies,
  handleFavoriteMovieClick,
}: {
  favoritesMovies: Movie[];
  handleFavoriteMovieClick: (id: Number) => void;
}) => {
  return (
    <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {favoritesMovies.length > 0 ? (
        favoritesMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            handleFavoriteMovieClick={handleFavoriteMovieClick}
          />
        ))
      ) : (
        <div>
          <h2>No favorite movies yet</h2>
          <p>
            Start adding movies to your favorites, and they will appear here!
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
