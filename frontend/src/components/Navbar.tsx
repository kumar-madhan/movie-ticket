'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-primary font-bold text-2xl">
          🎬 MovieTickets
        </Link>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <Menu />
        </button>

        <div
          className={`flex-col md:flex-row md:flex gap-6 items-center absolute md:static left-0 w-full md:w-auto bg-zinc-900 md:bg-transparent ${
            open ? 'flex' : 'hidden md:flex'
          }`}
        >
          <Link href="/movies" className="hover:text-primary">
            Movies
          </Link>
          <Link href="/profile" className="hover:text-primary">
            My Profile
          </Link>
          {session?.user ? (
            <button onClick={() => signOut()} className="text-sm text-gray-300 hover:text-primary">
              Logout
            </button>
          ) : (
            <button onClick={() => signIn()} className="text-sm text-gray-300 hover:text-primary">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
