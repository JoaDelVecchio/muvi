import MovieCard from "../components/MovieCard";
import { Movie } from "../types/types";

const Favorites = ({
  favoriteMovies,
  handleFavoriteMovieClick,
}: {
  favoriteMovies: Movie[];
  handleFavoriteMovieClick: (id: number) => void;
}) => {
  return (
    <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {favoriteMovies.length > 0 ? (
        favoriteMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={true} // Always true since it's in favorites
            handleFavoriteMovieClick={handleFavoriteMovieClick}
          />
        ))
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold">No favorite movies yet</h2>
          <p>Start adding movies to your favorites!</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
