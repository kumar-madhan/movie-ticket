// src/lib/api.ts

import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api",
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Movies
 */
export const getMovies = async () => {
  const res = await api.get("/movies");
  return res.data; // MUST return poster_url as-is
};

export const getMovieById = async (id: string | number) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};

/**
 * Showtimes
 */
export const getShowtimesByMovie = async (movieId: string | number) => {
  const res = await api.get(`/showtimes/movie/${movieId}`);
  return res.data;
};

export default api;
