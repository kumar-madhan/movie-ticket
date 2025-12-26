export interface Movie {
  id: string;
  title: string;
  description: string;
  duration: number;
  rating: string;
  poster_url: string;
}

export interface Showtime {
  id: string;
  movie_id: string;
  start_time: string;
  price_regular: number;
  price_premium: number;
}

export interface Booking {
  id: string;
  user_id: string;
  showtime_id: string;
  total_amount: number;
  status: string;
}
