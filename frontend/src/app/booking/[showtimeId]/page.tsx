'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getShowtimeById } from '@/lib/api';
import SeatGrid from '@/components/SeatGrid';
import type { Showtime } from '@/types/showtime';

export default function BookingPage() {
  const params = useParams();
  const showtimeId = Number(params.showtimeId);

  const [showtime, setShowtime] = useState<Showtime | null>(null);

  useEffect(() => {
    const load = async () => {
      const st = await getShowtimeById(showtimeId);
      setShowtime(st);
    };

    load();
  }, [showtimeId]);

  if (!showtime) {
    return (
      <div className="p-6 text-gray-400">
        Loading showtime...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        Select Your Seats
      </h1>

      <SeatGrid
        screenId={showtime.screenId}
        showtimeId={showtimeId}
        onChange={() => {}}
      />
    </div>
  );
}