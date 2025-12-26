'use client';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session } = useSession();
  const { data: bookings } = useQuery(['bookings'], async () => {
    const res = await api.get(`/bookings/user/${session?.user?.id}`);
    return res.data;
  });

  if (!session) return <p>Please log in to see your profile.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Bookings</h1>
      <ul className="space-y-3">
        {bookings?.map((b: any) => (
          <li key={b.id} className="border p-3 rounded">
            <p>Booking ID: {b.id}</p>
            <p>Status: {b.status}</p>
            <Link href={`/profile/tickets/${b.id}`} className="text-primary underline">
              View Ticket
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
