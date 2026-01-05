'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { clearTokens, isLoggedIn } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const syncAuth = () => setLoggedIn(isLoggedIn());

  useEffect(() => {
    syncAuth();

    window.addEventListener('auth-change', syncAuth);
    return () =>
      window.removeEventListener('auth-change', syncAuth);
  }, []);

  const logout = () => {
    clearTokens();
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black border-b border-zinc-800">
      <Link href="/" className="text-xl font-bold text-orange-500">
        🎬 CineVerse
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/">Home</Link>
        <Link href="/movies">Movies</Link>

        {loggedIn ? (
          <>
            <Link href="/profile">My Tickets</Link>
            <button
              onClick={logout}
              className="bg-zinc-800 px-4 py-2 rounded"
            >
              Sign out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-orange-500 text-black px-4 py-2 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
