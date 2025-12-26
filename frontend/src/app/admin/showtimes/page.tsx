'use client';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export default function AdminShowtimesPage() {
  const { data: showtimes } = useQuery(['showtimes'], async () => {
    const res = await api.get('/showtimes');
    return res.data;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Showtimes</h1>
      <ul className="space-y-3">
        {showtimes?.map((s: any) => (
          <li key={s.id} className="border p-3 rounded flex justify-between">
            <span>
              {s.movie.title} — {new Date(s.start_time).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
