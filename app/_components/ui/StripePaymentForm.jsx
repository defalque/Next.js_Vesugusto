"use client";

import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function StripePaymentForm({ totalAmount, userId, cartId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalAmount * 100 }),
        });

        if (!res.ok) {
          throw new Error("Errore nella creazione del PaymentIntent");
        }

        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error(err);
        setError("Errore nella comunicazione con il server.");
      }
    };

    createPaymentIntent();
  }, [totalAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements || !clientSecret) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setError(error.message || "Errore nel pagamento.");
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // CREAZIONE ORDINE
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          cartId,
          paymentIntentId: paymentIntent.id,
        }),
      });

      if (res.ok) {
        // ✅ Redirect client-side al success
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/success?payment_intent=${paymentIntent.id}`;
      } else {
        setError("Ordine creato ma errore nel salvataggio.");
      }

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#333",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#fa5252" },
          },
        }}
      />

      {error && <p className="text-primary-950 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || loading || success}
        className="cursor-pointer hover:bg-primary-900 bg-primary-950 text-primary-50 rounded-xl py-3 px-6 disabled:animate-pulse font-semibold"
      >
        {loading
          ? "Elaborazione..."
          : `Paga  ${
              Number.isInteger(totalAmount)
                ? `${totalAmount},00`
                : totalAmount.toFixed(2).replace(".", ",")
            } €`}
      </button>

      {success && (
        <p className="text-green-500 font-semibold">
          Pagamento completato con successo!
        </p>
      )}
    </form>
  );
}
