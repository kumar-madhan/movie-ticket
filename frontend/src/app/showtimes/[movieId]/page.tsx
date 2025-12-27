"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getShowtimesByMovie } from "@/lib/api";

export default function ShowtimesPage() {
  const params = useParams();
  const movieId = params?.movieId as string | undefined;

  const { data: showtimes, isLoading } = useQuery({
    queryKey: ["showtimes", movieId],
    enabled: !!movieId,
    queryFn: () => getShowtimesByMovie(movieId!),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Showtimes</h1>
      <ul className="space-y-3">
        {showtimes?.map((s: any) => (
          <li
            key={s.id}
            className="border border-zinc-700 rounded p-3"
          >
            <p>{new Date(s.start_time).toLocaleString()}</p>
            <p className="text-gray-400">
              Regular: ${s.price_regular}
            </p>
          </li>
        ))}
      </ul>

      {showtimes?.length === 0 && (
        <p className="text-gray-400 mt-4">No showtimes available.</p>
      )}
    </div>
  );
}
