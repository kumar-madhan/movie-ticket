"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get("/users/me")
      .then((res) => setUser(res.data))
      .catch(() => (window.location.href = "/login"));
  }, []);

  if (!user) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="p-6 text-white bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-orange-400">Profile</h1>
      <p>Email: {user.email}</p>
      <p>Name: {user.name}</p>
    </div>
  );
}
