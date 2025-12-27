"use client";

import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/lib/api";
import MovieCard from "@/components/MovieCard";

export default function HomePage() {
  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-orange-400 flex justify-center items-center gap-2">
          🎬 Featured Movies
        </h1>
        <p className="text-gray-400 mt-2">
          Book your favorite movie tickets easily
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] bg-zinc-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <p className="text-center text-red-400">
          Failed to load movies. Please try again.
        </p>
      )}

      {/* Empty */}
      {!isLoading && movies?.length === 0 && (
        <p className="text-center text-gray-400">
          No movies available right now.
        </p>
      )}

      {/* Movies */}
      {!isLoading && movies?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movies.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
