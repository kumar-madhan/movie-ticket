"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMovieById, getShowtimesByMovie } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const { data: movie, isLoading } = useQuery<Movie>({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(movieId as string),
  });

  const {
    data: showtimes,
    error: showtimesError,
  } = useQuery({
    queryKey: ["showtimes", movieId],
    queryFn: () => getShowtimesByMovie(movieId as string),
    retry: false,
  });

  if (isLoading || !movie) {
    return <p className="text-center text-gray-400 mt-10">Loading movie...</p>;
  }

  const poster =
    movie.posterUrl && movie.posterUrl.trim() !== ""
      ? movie.posterUrl
      : "/placeholder-movie.png";

  return (
    <div className="flex flex-col md:flex-row gap-8 px-6">
      <Image
        src={poster}
        alt={movie.title}
        width={240}
        height={360}
        className="rounded-md object-cover"
      />

      <div>
        <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>
        <p className="text-gray-300 mb-6">{movie.description}</p>

        <h2 className="text-xl mb-3">Available Showtimes</h2>

        {showtimesError ? (
          <p className="text-gray-400">
            Please{" "}
            <Link href="/login" className="underline text-orange-400">
              login
            </Link>{" "}
            to view showtimes.
          </p>
        ) : (
          <ul className="space-y-2">
            {showtimes?.map((s: any) => (
              <li key={s.id}>
                <Link
                  href={`/booking/${s.id}`}
                  className="underline text-orange-400"
                >
                  {new Date(s.start_time).toLocaleString()} — $
                  {s.price_regular.toFixed(2)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
