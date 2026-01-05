export interface Movie {
  id: number;
  title: string;
  description: string;
  duration: number;
  rating: string;
  poster_url: string;
}

export interface Booking {
  id: number;
  user_id: number;
  showtime_id: number;
  total_amount: number;
  status: string;
}
