'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Movie } from '@/types';

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg"
    >
      <Link href={`/movies/${movie.id}`}>
        <Image
          src={movie.poster_url}
          alt={movie.title}
          width={300}
          height={400}
          className="object-cover w-full h-80"
        />
        <div className="p-3">
          <h3 className="font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-400">{movie.duration} min</p>
        </div>
      </Link>
    </motion.div>
  );
}
