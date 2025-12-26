'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import SeatGrid from '@/components/SeatGrid';
import BookingSummary from '@/components/BookingSummary';

export default function BookingPage() {
  const { showtimeId } = useParams();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleProceed = () => {
    router.push(`/checkout?showtime=${showtimeId}&seats=${selectedSeats.join(',')}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Select Your Seats</h1>
      <SeatGrid selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
      <BookingSummary selectedSeats={selectedSeats} onProceed={handleProceed} />
    </div>
  );
}
