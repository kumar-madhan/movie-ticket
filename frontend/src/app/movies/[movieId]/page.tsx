'use client';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getMovieById, getShowtimesByMovie } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const router = useRouter();
  
  const { data: movie } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieById(movieId as string),
  });

  const { data: showtimes } = useQuery({
    queryKey: ['showtimes', movieId],
    queryFn: () => getShowtimesByMovie(movieId as string),
  });

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Image
  src={poster}
  alt={movie.title}
  width={240}
  height={360}
  className="rounded-md object-cover"
/>
      <div>
        <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>
        <p className="text-gray-300 mb-4">{movie.description}</p>
        <h2 className="text-xl mb-2">Available Showtimes</h2>
        <ul className="space-y-2">
          {showtimes?.map((s: any) => (
            <li key={s.id}>
              <Link href={`/booking/${s.id}`} className="underline text-primary">
                {new Date(s.start_time).toLocaleString()} — ${s.price_regular.toFixed(2)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
