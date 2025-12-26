'use client';

import { useMemo } from 'react';

interface Props {
  selectedSeats: string[];
  onProceed: () => void;
}

export default function BookingSummary({ selectedSeats, onProceed }: Props) {
  const total = useMemo(() => selectedSeats.length * 10, [selectedSeats]);

  return (
    <div className="bg-zinc-900 p-4 rounded border border-zinc-800 w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-2">Booking Summary</h3>
      <p>Seats: {selectedSeats.join(', ') || 'None selected'}</p>
      <p>Total: ${total.toFixed(2)}</p>
      <button
        onClick={onProceed}
        disabled={selectedSeats.length === 0}
        className="mt-3 bg-primary px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-40"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
