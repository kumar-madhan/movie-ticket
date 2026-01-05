'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SeatGrid from '@/components/SeatGrid';
import BookingSummary from '@/components/BookingSummary';
import { Seat } from '@/types/seat';
import { Showtime } from '@/types/showtime';
import { getShowtimeById } from '@/lib/api';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const showtimeId = Number(params.showtimeId);

  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    getShowtimeById(showtimeId).then(res =>
      setShowtime(res.data)
    );
  }, [showtimeId]);

  if (!showtime) return null;

  const handleProceed = () => {
    router.push(
      `/checkout?showtime=${showtimeId}&seats=${selectedSeats
        .map(s => s.id)
        .join(',')}&total=${totalAmount}`
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Select Your Seats</h1>

      <SeatGrid
        screenId={showtime.screen.id}
        showtimeId={showtimeId}
        onChange={(seats, total) => {
          setSelectedSeats(seats);
          setTotalAmount(total);
        }}
      />

      <BookingSummary
        selectedSeats={selectedSeats.map(
          s => `${s.rowLabel}${s.number}`
        )}
        totalAmount={totalAmount}
        onProceed={handleProceed}
      />
    </div>
  );
}
