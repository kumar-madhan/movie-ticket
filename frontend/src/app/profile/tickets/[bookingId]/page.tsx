'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function TicketPage() {
  const params = useParams();
  const bookingId = params?.bookingId as string | undefined;

  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking', bookingId],
    enabled: !!bookingId,
    queryFn: async () => {
      const res = await api.get(`/bookings/${bookingId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="p-6 text-gray-400">
        Loading ticket…
      </p>
    );
  }

  if (!booking) {
    return (
      <p className="p-6 text-gray-400">
        Ticket not found.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Your Ticket</h1>

      <div className="border border-zinc-800 rounded p-4 space-y-2">
        <p>
          <span className="text-gray-400">
            Booking ID:
          </span>{' '}
          {booking.id}
        </p>

        <p>
          <span className="text-gray-400">
            Movie:
          </span>{' '}
          {booking.showtime.movie.title}
        </p>

        <p>
          <span className="text-gray-400">
            Showtime:
          </span>{' '}
          {new Date(
            booking.showtime.startTime
          ).toLocaleString()}
        </p>

        <p>
          <span className="text-gray-400">
            Seats:
          </span>{' '}
          {booking.bookingSeats
            .map(
              (bs: any) =>
                `${bs.seat.rowLabel}${bs.seat.number}`
            )
            .join(', ')}
        </p>

        <p>
          <span className="text-gray-400">
            Total Paid:
          </span>{' '}
          ₹{booking.totalAmount}
        </p>

        <p>
          <span className="text-gray-400">
            Status:
          </span>{' '}
          {booking.status}
        </p>
      </div>

      {booking.qrCode && (
        <div className="flex justify-center">
          <img
            src={`data:image/png;base64,${booking.qrCode}`}
            alt="Booking QR Code"
            className="w-48 h-48 border border-zinc-700 rounded"
          />
        </div>
      )}
    </div>
  );
}
