'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export default function TicketPage() {
  const { bookingId } = useParams();
  const { data: booking } = useQuery(['booking', bookingId], async () => {
    const res = await api.get(`/bookings/${bookingId}`);
    return res.data;
  });

  if (!booking) return <p>Loading ticket...</p>;

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Your Ticket</h1>
      <p>Booking ID: {booking.id}</p>
      <p>Movie: {booking.showtime.movie.title}</p>
      <Image
        src={booking.qr_code}
        alt="QR Code"
        width={200}
        height={200}
        className="mx-auto mt-6"
      />
    </div>
  );
}
