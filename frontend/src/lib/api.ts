import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from './auth';

/* ================= AXIOS INSTANCE ================= */

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    'http://localhost:3001/api',
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
        original.headers.Authorization =
          `Bearer ${res.data.accessToken}`;
        return api(original);
      } catch {
        clearTokens();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

/* ================= API CALLS ================= */

/* ---------- AUTH ---------- */
export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const register = (
  name: string,
  email: string,
  password: string
) =>
  api.post('/auth/register', { name, email, password });

/* ---------- MOVIES ---------- */
export const getMovies = async () => {
  const res = await api.get('/movies');

  return res.data.map((m: any) => ({
    id: m.id,
    title: m.title,
    description: m.description,
    duration: m.duration,
    rating: m.rating,
    poster_url: m.poster_url ?? '',
  }));
};

export const getMovieById = async (id: number) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};

/* ---------- SHOWTIMES ---------- */
export const getShowtimes = async () => {
  const res = await api.get('/showtimes');
  return res.data.map((s: any) => ({
    ...s,
    startTime: s.start_time,
  }));
};

export const getShowtimesByMovie = async (movieId: number) => {
  const res = await api.get('/showtimes');

  return res.data
    .filter((s: any) => s.movie_id === movieId)
    .map((s: any) => ({
      id: s.id,
      movieId: s.movie_id,
      movieTitle: s.movie_title,
      screenId: s.screen_id,
      screenNumber: s.screen_number,
      theaterName: s.theater_name,
      startTime: s.start_time,
      priceRegular: s.price_regular,
      pricePremium: s.price_premium,
    }));
};

export const getShowtimeById = async (id: number) => {
  const res = await api.get(`/showtimes/${id}`);
  const s = res.data;

  return {
    id: s.id,
    movieId: s.movie_id,
    movieTitle: s.movie_title,
    screenId: s.screen_id,
    screenNumber: s.screen_number,
    theaterName: s.theater_name,
    startTime: s.start_time,
    priceRegular: s.price_regular,
    pricePremium: s.price_premium,
  };
};

/* ---------- SEATS ---------- */
export const getSeatsByScreen = async (screenId: number) => {
  const res = await api.get(`/screens/${screenId}/seats`);
  return res.data;
};

export const getBookedSeatsByShowtime = async (
  showtimeId: number
) => {
  const res = await api.get(
    `/showtimes/${showtimeId}/seats`
  );
  return res.data;
};

/* ---------- BOOKINGS ---------- */
export const createBooking = async (
  showtimeId: number,
  seatIds: number[],
  totalAmount: number
) =>
  api.post('/bookings', {
    showtimeId,
    seatIds,
    totalAmount,
  });

export const getUserBookings = async (userId: number) =>
  api.get(`/bookings/user/${userId}`);

export const getBookingById = async (bookingId: number) =>
  api.get(`/bookings/${bookingId}`);
