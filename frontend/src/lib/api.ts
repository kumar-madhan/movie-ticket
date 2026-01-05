import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from './auth';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api',
});

/* ---------- REQUEST ---------- */
api.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ---------- RESPONSE ---------- */
api.interceptors.response.use(
  res => res,
  async error => {
    const original = error.config;

    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.url?.includes('/auth/refresh')
    ) {
      original._retry = true;

      const refresh = getRefreshToken();
      if (!refresh) {
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const res = await api.post('/auth/refresh', {
          refreshToken: refresh,
        });

        setTokens(res.data.accessToken, res.data.refreshToken);
        original.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(original);
      } catch {
        clearTokens();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

/* ---------- API CALLS ---------- */

/* User login */
export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

/* User registration */
export const register = (name: string, email: string, password: string) =>
  api.post('/auth/register', { name, email, password });

/* Getting all movies */
export const getMovies = async () => {
  const res = await api.get('/movies');
  return res.data;
};

/* Getting movie by ID */
export const getMovieById = async (id: number | string) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};

/* Getting showtimes for a movie */
export const getShowtimesByMovie = async (movieId: number) => {
  const res = await axios.get(`/api/showtimes`);
  return res.data
    .filter((s: any) => s.movie_id === movieId)
    .map((s: any) => ({
      ...s,
      startTime: s.start_time, // ✅ FIX
    }));
};


/* Getting showtime by ID */
export const getShowtimeById = (id: number) =>
  api.get(`/showtimes/${id}`);

/* Getting seats for a screen */
export const getSeatsByScreen = (screenId: number) =>
  api.get(`/screens/${screenId}/seats`);

/* Getting booked seats for a showtime */
export const getBookedSeatsByShowtime = (showtimeId: number) =>
  api.get(`/showtimes/${showtimeId}/seats`);

/* Booking a seat */
export const getUserBookings = (userId: number) =>
  api.get(`/bookings/user/${userId}`);
