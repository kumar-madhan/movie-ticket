import { SeatType } from './seat';

export interface Screen {
  id: number;
  name: string;
}

export interface Showtime {
  id: number;
  startTime: string;
  priceRegular: number;
  pricePremium: number;
  screen: Screen;
}
