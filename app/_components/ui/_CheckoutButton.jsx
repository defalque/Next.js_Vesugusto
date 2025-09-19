"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import SpinnerMini from "./SpinnerMiniColored";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Errore durante la creazione della sessione");
      }

      const { sessionId } = await res.json();

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );

      if (!stripe) {
        throw new Error("Stripe non è stato caricato");
      }

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Errore nel checkout:", error);
      alert("Si è verificato un errore durante il pagamento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-primary-950 text-primary-50 hover:bg-primary-800 flex w-full cursor-pointer items-center justify-center rounded-xl px-8 py-3 text-lg font-medium transition-colors duration-200"
      disabled={loading}
    >
      {loading ? <SpinnerMini /> : "Paga"}
    </button>
  );
}
