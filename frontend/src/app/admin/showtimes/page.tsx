"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function AdminShowtimesPage() {
  const { data: showtimes, isLoading } = useQuery({
    queryKey: ["showtimes"],
    queryFn: async () => {
      const res = await api.get("/showtimes");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="p-6 text-gray-400">Loading showtimes…</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Showtimes</h1>

      <ul className="space-y-3">
        {showtimes?.map((s: any) => (
          <li
            key={s.id}
            className="border border-zinc-800 p-4 rounded flex justify-between"
          >
            <span>
              Movie ID: {s.movie_id} —{" "}
              {new Date(s.start_time).toLocaleString()}
            </span>
            <span className="text-gray-400">
              ${s.price_regular}
            </span>
          </li>
        ))}
      </ul>

      {showtimes?.length === 0 && (
        <p className="text-gray-400 mt-6">No showtimes found.</p>
      )}
    </div>
  );
}
