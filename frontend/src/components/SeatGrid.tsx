'use client';

import { useEffect, useState } from 'react';

interface SeatGridProps {
  selectedSeats: string[];
  setSelectedSeats: (seats: string[]) => void;
}

const rows = ['A', 'B', 'C', 'D', 'E'];
const seatsPerRow = 10;

export default function SeatGrid({ selectedSeats, setSelectedSeats }: SeatGridProps) {
  const [bookedSeats] = useState<string[]>(['A3', 'A4', 'B5']); // demo only

  const toggleSeat = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      {rows.map((row) => (
        <div key={row} className="flex gap-1">
          {Array.from({ length: seatsPerRow }, (_, i) => {
            const seatId = `${row}${i + 1}`;
            const isBooked = bookedSeats.includes(seatId);
            const isSelected = selectedSeats.includes(seatId);
            return (
              <button
                key={seatId}
                onClick={() => toggleSeat(seatId)}
                disabled={isBooked}
                className={`w-8 h-8 text-sm rounded ${
                  isBooked
                    ? 'bg-gray-600 cursor-not-allowed'
                    : isSelected
                    ? 'bg-primary'
                    : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
