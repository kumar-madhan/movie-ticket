"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Movie } from "@/types";

export default function MovieCard({ movie }: { movie: Movie }) {
  const hasPoster =
    typeof movie.posterUrl === "string" &&
    movie.posterUrl.trim().length > 0;

  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.25 }}
      className="relative rounded-lg overflow-hidden bg-gray-900 shadow-lg"
    >
      <Link href={`/movies/${movie.id}`}>
        <div className="relative aspect-[2/3] w-full">
          {hasPoster ? (
            <Image
              key={movie.posterUrl} // 🔑 forces re-render when src changes
              src={movie.posterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 15vw"
              className="object-cover"
            />
          ) : (
            <Image
              src="/placeholder-movie.png"
              alt="No poster available"
              fill
              className="object-cover opacity-80"
            />
          )}
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
