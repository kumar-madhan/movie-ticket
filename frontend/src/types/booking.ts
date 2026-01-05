import { Showtime } from './showtime';

export interface Booking {
  id: number;
  totalAmount: number;
  status: string;
  qrCode?: string;
  showtime: Showtime;
}
