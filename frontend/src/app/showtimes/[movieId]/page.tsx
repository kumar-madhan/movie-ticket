'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getShowtimesByMovie } from '@/lib/api';

export default function ShowtimesPage() {
  const { movieId } = useParams();
  const { data: showtimes, isLoading } = useQuery(['showtimes', movieId], () =>
    getShowtimesByMovie(movieId as string)
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Showtimes</h1>
      <ul className="space-y-3">
        {showtimes?.map((s: any) => (
          <li
            key={s.id}
            className="border border-zinc-700 rounded p-3 flex justify-between items-center"
          >
            <div>
              <p>{new Date(s.start_time).toLocaleString()}</p>
              <p className="text-gray-400">Regular: ${s.price_regular}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
