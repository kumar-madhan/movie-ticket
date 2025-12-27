"use client";

import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/lib/api";
import api from "@/lib/api";

export default function AdminMoviesPage() {
  const {
    data: movies,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  const handleDelete = async (id: number) => {
    await api.delete(`/admin/movies/${id}`);
    refetch();
  };

  if (isLoading) {
    return <p className="p-6 text-gray-400">Loading movies…</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Movies</h1>

      <ul className="space-y-3">
        {movies?.map((m: any) => (
          <li
            key={m.id}
            className="border border-zinc-800 p-4 rounded flex justify-between items-center"
          >
            <span className="font-medium">{m.title}</span>

            <button
              onClick={() => handleDelete(m.id)}
              className="text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {movies?.length === 0 && (
        <p className="text-gray-400 mt-6">No movies found.</p>
      )}
    </div>
  );
}
