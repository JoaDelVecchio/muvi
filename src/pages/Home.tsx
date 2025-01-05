import MovieCard from "../components/MovieCard";
import { Movie as MovieType } from "../types/types";

const Home = ({
  filteredMovies,
  handleFavoriteMovieClick,
}: {
  filteredMovies: MovieType[];
  handleFavoriteMovieClick: (id: Number) => void;
}) => {
  return (
    <div className=" h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 p-6">
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            handleFavoriteMovieClick={handleFavoriteMovieClick}
          />
        ))
      ) : (
        <p className="text-center text-gray-400 col-span-full">
          No recent movies found with that title. Press search to browse through
          all movies.
        </p>
      )}
    </div>
  );
};

export default Home;
