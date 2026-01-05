'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();

  const showtimeId = Number(params.get('showtime'));
  const seatIds = (params.get('seats') || '')
    .split(',')
    .filter(Boolean)
    .map(Number);
  const totalAmount = Number(params.get('total'));

  const [bookingId, setBookingId] = useState<number | null>(null);

  const confirmBooking = async () => {
    const res = await api.post('/bookings', {
      userId: 1,
      showtimeId,
      seatIds,
      totalAmount,
    });

    setBookingId(res.data.id);
  };

  useEffect(() => {
    if (seatIds.length > 0) {
      confirmBooking();
    }
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Booking Confirmation</h1>

      <div className="p-4 bg-slate-800 rounded space-y-2">
        <div>Showtime ID: {showtimeId}</div>
        <div>Seats: {seatIds.join(', ')}</div>
        <div>Total: ₹{totalAmount}</div>
        {bookingId && <div>Booking ID: {bookingId}</div>}
      </div>

      {bookingId && (
        <button
          onClick={() => router.push(`/profile/tickets/${bookingId}`)}
          className="px-4 py-2 bg-green-600 rounded"
        >
          View Ticket
        </button>
      )}
    </div>
  );
}
