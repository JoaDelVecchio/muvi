import MovieCard from "../components/MovieCard";
import { Movie as Movie } from "../types/types";

const Home = ({
  movies,
  searchedMovies,
  favoriteMovies,
  handleFavoriteMovieClick,
}: {
  movies: Movie[];
  searchedMovies: Movie[];
  favoriteMovies: Movie[];
  handleFavoriteMovieClick: (id: number) => void;
}) => {
  const moviesToDisplay = searchedMovies.length > 0 ? searchedMovies : movies;

  return (
    <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {moviesToDisplay.map((movie) => {
        const isFavorite = favoriteMovies.some((fav) => fav.id === movie.id);

        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite}
            handleFavoriteMovieClick={handleFavoriteMovieClick}
          />
        );
      })}
    </div>
  );
};

export default Home;
