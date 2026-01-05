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
    setLoading(true);

    Promise.all([
      api.get(`/movies/${movieId}`),
      api.get(`/showtimes`), // backend does NOT support query param
    ])
      .then(([movieRes, showtimeRes]) => {
        setMovie(movieRes.data);

        // ✅ FIX 1: filter + normalize snake_case
        const filtered = showtimeRes.data
          .filter((s: any) => s.movie_id === movieId)
          .map((s: any) => ({
            ...s,
            startTime: s.start_time,
          }));

        setShowtimes(filtered);
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) {
    return <p className="p-6 text-gray-400">Loading…</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex gap-8">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-64 rounded"
        />

        <div className="flex flex-col gap-4 max-w-xl">
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          {movie.tagline && (
            <p className="italic text-gray-400">{movie.tagline}</p>
          )}

          <p className="text-gray-300">{movie.description}</p>

          <div className="flex flex-wrap gap-4 text-sm mt-2">
            <span className="px-3 py-1 rounded bg-zinc-800">
              ⏱ {movie.duration} mins
            </span>

            <span className="px-3 py-1 rounded bg-zinc-800">
              ⭐ {movie.voteAverage?.toFixed(1)}
            </span>

            <span className="px-3 py-1 rounded bg-zinc-800">
              {movie.adult ? 'R' : 'PG-13'}
            </span>

            <span className="px-3 py-1 rounded bg-zinc-800">
              {movie.originalLanguage?.toUpperCase()}
            </span>

            <span className="px-3 py-1 rounded bg-zinc-800">
              {movie.releaseDate?.slice(0, 4)}
            </span>

            <span className="px-3 py-1 rounded bg-zinc-800">
              👥 {movie.voteCount?.toLocaleString()} votes
            </span>
          </div>

          {/* ✅ FIX 2: genres are strings, not objects */}
          {movie.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genres.map((g: string) => (
                <span
                  key={g}
                  className="px-3 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400"
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          <div className="text-sm text-gray-400 mt-4 space-y-1">
            <p>Status: {movie.status}</p>
            <p>Language: {movie.originalLanguage?.toUpperCase()}</p>
          </div>

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

            {movie.imdbId && (
              <a
                href={`https://www.imdb.com/title/${movie.imdbId}`}
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
        <h2 className="text-2xl font-semibold">Available Showtimes</h2>

        {showtimes.length === 0 && (
          <p className="text-gray-400">No showtimes available.</p>
        )}

        <div className="flex flex-wrap gap-3">
          {showtimes.map(st => (
            <button
              key={st.id}
              onClick={() => router.push(`/booking/${st.id}`)}
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
