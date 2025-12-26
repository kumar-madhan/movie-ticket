"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get("jwt"));
  }, []);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <Link href="/" className="text-2xl font-bold text-orange-400">
        🎬 Movie Ticket
      </Link>

      <div className="space-x-4">
        <Link href="/movies">Movies</Link>
        {isLoggedIn ? (
          <>
            <Link href="/profile">Profile</Link>
            <button
              onClick={() => {
                Cookies.remove("jwt");
                window.location.href = "/";
              }}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-orange-500 px-3 py-1 rounded hover:bg-orange-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
