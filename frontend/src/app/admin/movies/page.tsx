'use client';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '@/lib/api';
import api from '@/lib/api';

export default function AdminMoviesPage() {
  const { data: movies, refetch } = useQuery(['movies'], getMovies);

  const handleDelete = async (id: string) => {
    await api.delete(`/admin/movies/${id}`);
    refetch();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Movies</h1>
      <ul className="space-y-3">
        {movies?.map((m: any) => (
          <li key={m.id} className="border p-3 rounded flex justify-between">
            <span>{m.title}</span>
            <button onClick={() => handleDelete(m.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
