import MovieCard from "../components/MovieCard";
import { Movie as MovieType } from "../types/types";

const Home = ({ filteredMovies }: { filteredMovies: MovieType[] }) => {
  return (
    <div className=" h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 p-6">
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <p className="text-center text-gray-400 col-span-full">
          No movies found with that title.
        </p>
      )}
    </div>
  );
};

export default Home;
