"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      Cookies.set("jwt", data.accessToken);
      router.push("/movies");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-md px-6">
        <form
          onSubmit={handleLogin}
          className="bg-gray-900/90 backdrop-blur rounded-2xl shadow-2xl p-8 border border-gray-800"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white">🎬 Movie Ticket</h1>
            <p className="text-gray-400 text-sm mt-1">
              Sign in to book your seats
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-2 rounded mb-4">
              {error}
            </div>
          )}

          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            type="email"
            className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-orange-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block text-sm text-gray-400 mb-1">Password</label>
          <input
            type="password"
            className="w-full mb-6 px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-orange-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition text-white font-semibold py-2 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
