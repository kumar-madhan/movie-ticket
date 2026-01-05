export type SeatType = 'REGULAR' | 'PREMIUM';

export interface Seat {
  id: number;
  rowLabel: string;
  number: number;
  type: SeatType;
}
