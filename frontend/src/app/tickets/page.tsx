'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserBookings } from '@/lib/api';
import { getUserIdFromToken } from '@/lib/auth';

export default function TicketsPage() {


  const userId = getUserIdFromToken();
  if (!userId) return <p>Please login again.</p>;

  const { data, isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: () => getUserBookings(userId),
  });

  if (isLoading) {
    return <p className="p-6 text-gray-400">Loading tickets...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Tickets</h1>

      {data?.data?.length === 0 && (
        <p className="text-gray-400">No bookings found.</p>
      )}

      <ul className="space-y-3">
        {data?.data?.map((b: any) => (
          <li
            key={b.id}
            className="p-4 rounded bg-zinc-800"
          >
            Booking #{b.id} — ₹{b.total_amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
