'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = Number(params.movieId);

  const [movie, setMovie] = useState<any>(null);
  const [showtimes, setShowtimes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(`/movies/${movieId}`),
      api.get(`/showtimes?movieId=${movieId}`),
    ]).then(([movieRes, showtimeRes]) => {
      setMovie(movieRes.data);
      setShowtimes(showtimeRes.data);
      setLoading(false);
    });
  }, [movieId]);

  if (loading) {
    return (
      <p className="p-6 text-gray-400">
        Loading…
      </p>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex gap-8">
        {/* Poster */}
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-64 rounded"
        />

        {/* Details */}
        <div className="flex flex-col gap-4 max-w-xl">
          <h1 className="text-4xl font-bold">
            {movie.title}
          </h1>

          {movie.tagline && (
            <p className="italic text-gray-400">
              {movie.tagline}
            </p>
          )}

          <p className="text-gray-300">
            {movie.overview || movie.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 text-sm mt-2">
            <span className="px-3 py-1 rounded bg-zinc-800">
              ⏱ {movie.runtime || movie.duration} mins
            </span>

            <span className="px-3 py-1 rounded bg-zinc-800">
              ⭐ {movie.vote_average?.toFixed(1) ?? '—'}
            </span>

            <span className="px-3 py-1 rounded bg-zinc-800">
              {movie.adult ? 'R' : 'PG-13'}
            </span>

            <span className="px-3 py-1 rounded bg-zinc-800">
              {movie.original_language?.toUpperCase()}
            </span>

            <span className="px-3 py-1 rounded bg-zinc-800">
              {new Date(movie.release_date).getFullYear()}
            </span>

            {/* NEW */}
            <span className="px-3 py-1 rounded bg-zinc-800">
              👥 {movie.vote_count?.toLocaleString() ?? '—'} votes
            </span>
          </div>

          {/* Genres */}
          {movie.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genres.map((g: any) => (
                <span
                  key={g.id}
                  className="px-3 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400"
                >
                  {g.name}
                </span>
              ))}
            </div>
          )}

          {/* Extra info (collapsible later) */}
          <div className="text-sm text-gray-400 mt-4 space-y-1">
            <p>Status: {movie.status}</p>
            <p>
              Language:{' '}
              {movie.spoken_languages?.map((l: any) => l.english_name).join(', ')}
            </p>
          </div>

          {/* External links */}
          <div className="flex gap-4 mt-2 text-sm">
            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                className="text-orange-400 hover:underline"
              >
                Official Site
              </a>
            )}

            {movie.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                className="text-orange-400 hover:underline"
              >
                IMDb
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Available Showtimes
        </h2>

        {showtimes.length === 0 && (
          <p className="text-gray-400">
            No showtimes available.
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          {showtimes.map(st => (
            <button
              key={st.id}
              onClick={() =>
                router.push(`/booking/${st.id}`)
              }
              className="px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700"
            >
              {new Date(st.startTime).toLocaleString()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
