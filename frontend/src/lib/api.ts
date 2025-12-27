// import axios from "axios";
// import Cookies from "js-cookie";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api",
// });

// api.interceptors.request.use((config) => {
//   const token = Cookies.get("jwt");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const getMovies = async () => {
//   const res = await api.get("/movies");

//   return res.data.map((m: any) => ({
//     ...m,
//     posterUrl: m.poster_url,
//   }));
// };

// export interface Movie {
//   id: number;
//   title: string;
//   duration: number;
//   posterUrl?: string;
// }


// export default api;


import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('jwt');
  if (token && config && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const normalizeMovie = (m: any) => ({
  id: m.id ?? m._id,
  title: m.title ?? '',
  duration: m.duration ?? 0,
  poster_url: m.poster_url ?? m.posterUrl ?? m.poster ?? '',
  ...m,
});

export const getMovies = async () => {
  const res = await api.get('/movies');
  const payload = res.data?.data ?? res.data;
  if (!Array.isArray(payload)) return [];
  return payload.map(normalizeMovie);
};

export default api;