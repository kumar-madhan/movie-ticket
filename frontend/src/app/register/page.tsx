"use client";

import { useState } from "react";
import { register } from "@/lib/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      setMessage("Registration successful! Redirecting...");
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-96 space-y-4">
        <h1 className="text-2xl font-bold text-orange-500">Register</h1>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 rounded bg-gray-800"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-orange-600 w-full py-2 rounded hover:bg-orange-700">
          Register
        </button>
        {message && <p className="text-sm text-center text-gray-400">{message}</p>}
      </form>
    </div>
  );
}
