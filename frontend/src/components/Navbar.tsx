"use client";

import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get("jwt"));
  }, [pathname]);

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname === path
        ? "bg-orange-500 text-black"
        : "text-gray-300 hover:text-white hover:bg-zinc-800"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-zinc-800">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="CineVerse"
            width={32}
            height={32}
          />
          <span className="text-xl font-extrabold tracking-wide text-orange-400">
            CineVerse
          </span>
        </Link>

        {/* Center: Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/movies" className={linkClass("/movies")}>
            Movies
          </Link>
        </div>

        {/* Right: Auth */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link href="/profile" className={linkClass("/profile")}>
                Profile
              </Link>
              <button
                onClick={() => {
                  Cookies.remove("jwt");
                  window.location.href = "/login";
                }}
                className="px-3 py-2 rounded-md bg-red-600 text-sm font-medium text-white hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-md bg-orange-500 text-sm font-semibold text-black hover:bg-orange-400"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
