"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { getMovies } from "@/lib/api";
import Link from "next/link";

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
    return <p className="text-gray-400 p-6">Loading movies...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Movies</h1>
        <Link
          href="/admin/movies/new"
          className="bg-orange-500 px-4 py-2 rounded text-black font-semibold"
        >
          Add Movie
        </Link>
      </div>

      <table className="w-full border border-zinc-800">
        <thead className="bg-zinc-900">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3">Duration</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies?.map((movie: any) => (
            <tr key={movie.id} className="border-t border-zinc-800">
              <td className="p-3">{movie.title}</td>
              <td className="p-3 text-center">{movie.duration} min</td>
              <td className="p-3 text-center space-x-3">
                <Link
                  href={`/admin/movies/${movie.id}`}
                  className="text-blue-400 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {movies?.length === 0 && (
        <p className="text-gray-400 mt-6 text-center">
          No movies found.
        </p>
      )}
    </div>
  );
}
