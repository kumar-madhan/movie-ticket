'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import api from '@/lib/api';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function CheckoutPage() {
  const search = useSearchParams();
  const showtime = search.get('showtime');
  const seats = search.get('seats')?.split(',') || [];
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const res = await api.post('/payments/create', { showtime, seats });
    await stripe?.redirectToCheckout({ sessionId: res.data.id });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p>Showtime: {showtime}</p>
      <p>Seats: {seats.join(', ')}</p>
      <button disabled={loading} onClick={handlePay} className="mt-4">
        {loading ? 'Processing...' : 'Pay with Stripe'}
      </button>
    </div>
  );
}
