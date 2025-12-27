"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import api from "@/lib/api";

export default function TicketPage() {
  const params = useParams();
  const bookingId = params?.bookingId as string | undefined;

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    enabled: !!bookingId,
    queryFn: async () => {
      const res = await api.get(`/bookings/${bookingId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="p-6 text-gray-400">Loading ticket…</p>;
  }

  if (!booking) {
    return <p className="p-6 text-gray-400">Ticket not found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Ticket</h1>

      <div className="border border-zinc-800 rounded p-4 space-y-2">
        <p>
          <span className="text-gray-400">Booking ID:</span>{" "}
          {booking.id}
        </p>
        <p>
          <span className="text-gray-400">Movie:</span>{" "}
          {booking.movieTitle}
        </p>
        <p>
          <span className="text-gray-400">Showtime:</span>{" "}
          {new Date(booking.showtime).toLocaleString()}
        </p>
        <p>
          <span className="text-gray-400">Seats:</span>{" "}
          {booking.seats}
        </p>
        <p>
          <span className="text-gray-400">Total Paid:</span>{" "}
          ${booking.totalAmount}
        </p>
      </div>
    </div>
  );
}
