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
    <div className="px-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        🎬 Featured Movies
      </h1>

      <div className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-6 
        gap-4
      ">
        {movies?.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>


  );
}
