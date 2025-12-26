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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-black shadow-lg">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-orange-400 hover:text-orange-300"
        >
          🎬 MovieTicket
        </Link>

        {/* Nav actions */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link
            href="/movies"
            className="text-gray-300 hover:text-white transition"
          >
            Movies
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="text-gray-300 hover:text-white transition"
              >
                Profile
              </Link>

              <button
                onClick={() => {
                  Cookies.remove("jwt");
                  window.location.href = "/login";
                }}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
