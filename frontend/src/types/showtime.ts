import { SeatType } from './seat';

export type Showtime = {
  id: number;
  movieId?: number;
  movieTitle?: string;
  screenId: number;
  screenNumber: number;
  theaterName: string;
  startTime: string;
  priceRegular: number;
  pricePremium: number;
};


export interface Screen {
  id: number;
  name: string;
}
