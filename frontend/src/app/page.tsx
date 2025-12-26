'use client';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '@/lib/api';
import MovieCard from '@/components/MovieCard';

export default function HomePage() {
  const { data: movies, isLoading } = useQuery(['movies'], getMovies);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-primary">🎬 Featured Movies</h1>
        <p className="text-gray-400 mt-2">Book your favorite movie tickets easily</p>
      </motion.div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies?.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
