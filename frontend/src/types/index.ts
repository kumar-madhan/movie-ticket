export interface Movie {
  id: number;
  title: string;
  description: string;
  duration: number;
  rating: string;
  posterUrl: string; // ✅ matches backend
}

export interface Showtime {
  id: number;
  movie_id: number;
  start_time: string;
  price_regular: number;
  price_premium: number;
}

export interface Booking {
  id: number;
  user_id: number;
  showtime_id: number;
  total_amount: number;
  status: string;
}
