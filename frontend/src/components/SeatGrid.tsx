'use client';

import { useEffect, useState } from 'react';
import type { AxiosResponse } from 'axios';
import { Seat } from '@/types/seat';
import {
  getSeatsByScreen,
  getBookedSeatsByShowtime,
} from '@/lib/api';

interface Props {
  screenId: number;
  showtimeId: number;
  onChange: (seats: Seat[], total: number) => void;
}

export default function SeatGrid({
  screenId,
  showtimeId,
  onChange,
}: Props) {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [bookedSeatIds, setBookedSeatIds] = useState<number[]>([]);
  const [selected, setSelected] = useState<Seat[]>([]);

  useEffect(() => {
    getSeatsByScreen(screenId).then(
      (res: AxiosResponse<Seat[]>) => setSeats(res.data)
    );

    getBookedSeatsByShowtime(showtimeId).then(
      (res: AxiosResponse<{ bookedSeatIds: number[] }>) =>
        setBookedSeatIds(res.data.bookedSeatIds)
    );
  }, [screenId, showtimeId]);

  const totalFor = (items: Seat[]) =>
    items.reduce(
      (sum, s) => sum + (s.type === 'PREMIUM' ? 300 : 200),
      0
    );

  const toggle = (seat: Seat) => {
    if (bookedSeatIds.includes(seat.id)) return;

    const next = selected.some(s => s.id === seat.id)
      ? selected.filter(s => s.id !== seat.id)
      : [...selected, seat];

    setSelected(next);
    onChange(next, totalFor(next));
  };

  return (
    <div className="grid grid-cols-10 gap-2">
      {seats.map(seat => {
        const booked = bookedSeatIds.includes(seat.id);
        const active = selected.some(s => s.id === seat.id);

        return (
          <button
            key={seat.id}
            disabled={booked}
            onClick={() => toggle(seat)}
            className={[
              'w-10 h-10 rounded text-xs',
              booked && 'bg-gray-500 cursor-not-allowed',
              active && 'bg-green-500',
              !booked && !active && 'bg-slate-700',
            ].join(' ')}
          >
            {seat.rowLabel}
            {seat.number}
          </button>
        );
      })}
    </div>
  );
}
