'use client';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '@/lib/api';
import MovieCard from '@/components/MovieCard';

export default function MoviesPage() {
  const { data: movies, isLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Movies</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {movies?.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
