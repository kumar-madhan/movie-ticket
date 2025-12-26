"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Movie } from "@/types";

export default function MovieCard({ movie }: { movie: Movie }) {
  const poster =
    movie.poster_url && movie.poster_url.trim() !== ""
      ? movie.poster_url
      : "/placeholder-movie.png";

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.25 }}
      className="relative rounded-lg overflow-hidden bg-gray-900 shadow-lg"
    >
      <Link href={`/movies/${movie.id}`}>
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={poster}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 15vw"
            className="object-cover"
            priority={false}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition flex flex-col justify-end p-3">
          <h3 className="text-sm font-semibold">{movie.title}</h3>
          <p className="text-xs text-gray-300">{movie.duration} min</p>
        </div>
      </Link>
    </motion.div>
  );
}
