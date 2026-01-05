'use client';

import { useEffect, useState } from 'react';
import { getUserBookings } from '@/lib/api';
import { getUserIdFromToken } from '@/lib/auth';
import { Booking } from '@/types/booking';
import Link from 'next/link';

export default function ProfilePage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (!userId) return;

    getUserBookings(userId).then(res =>
      setBookings(res.data)
    );
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Tickets</h1>

      {bookings.map(b => (
        <div
          key={b.id}
          className="p-4 rounded bg-slate-800 flex justify-between"
        >
          <div>
            <div>Booking #{b.id}</div>
            <div>Status: {b.status}</div>
            <div>Total: ₹{b.totalAmount}</div>
          </div>

          <Link
            href={`/profile/tickets/${b.id}`}
            className="text-indigo-400"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
