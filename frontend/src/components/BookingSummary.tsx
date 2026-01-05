interface Props {
  selectedSeats: string[];
  totalAmount: number;
  onProceed: () => void;
}

export default function BookingSummary({
  selectedSeats,
  totalAmount,
  onProceed,
}: Props) {
  return (
    <div className="p-4 rounded bg-slate-800 space-y-3">
      <div>Seats: {selectedSeats.join(', ') || 'None'}</div>
      <div>Total: ₹{totalAmount}</div>
      <button
        disabled={selectedSeats.length === 0}
        onClick={onProceed}
        className="px-4 py-2 bg-indigo-600 rounded disabled:opacity-50"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
