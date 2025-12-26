import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  withCredentials: true
});

export const getMovies = async () => {
  const res = await api.get('/movies');
  return res.data;
};

export const getMovieById = async (id: string) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};

export const getShowtimesByMovie = async (movieId: string) => {
  const res = await api.get(`/showtimes?movieId=${movieId}`);
  return res.data;
};

export default api;
