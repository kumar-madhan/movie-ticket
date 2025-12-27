"use client";

import { loadStripe } from "@stripe/stripe-js";
import api from "@/lib/api";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error("Stripe failed to load");
    }

    const res = await api.post("/payments/create", {
      showtime: 1,
      seats: 2,
    });

    // Stripe typings bug: redirectToCheckout exists at runtime
    await (stripe as any).redirectToCheckout({
      sessionId: res.data.id,
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <button
        onClick={handleCheckout}
        className="w-full bg-orange-500 text-black py-3 rounded font-semibold hover:bg-orange-400"
      >
        Pay with Stripe
      </button>
    </div>
  );
}
