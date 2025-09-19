"use client";

import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { formatCurrency } from "@/app/_lib/formatCurrency";
import Button from "../../ui/Button";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { confirmOrder, createOrder } from "@/app/_lib/actions";

export default function StripePaymentForm({
  amount,
  userId,
  cartId,
  name,
  email,
  disabled,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Creazione PaymentIntent e clientSecret
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount }),
        });

        if (!res.ok)
          throw new Error("Errore nella creazione del PaymentIntent");

        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error(err);
        setError("Errore nella comunicazione con il server.");
      }
    };

    createPaymentIntent();
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (disabled) {
      return;
    }

    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe non è disponibile al momento.");
      return;
    }

    try {
      // 1. Submit elements (e.g., validate form)
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message);
        return;
      }

      // 2. Crea ordine nel backend
      const orderId = await createOrder(userId, cartId, name, email, amount);
      if (!orderId) throw new Error("Errore nella creazione dell'ordine.");

      // 3. Conferma pagamento con Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://localhost:3000/payment-success/?amount=${amount}`,
          // Per produzione:
          // return_url: `${process.env.NEXT_PUBLIC_PROD_URL}/account/orders`,
        },
        redirect: "if_required",
      });

      if (error) {
        setError(error.message || "Errore nel pagamento.");
        return;
      }

      // 4. Se pagamento andato a buon fine, conferma ordine nel backend
      if (paymentIntent) {
        const toast = (await import("react-hot-toast")).default;
        toast.success("Pagamento avvenuto con successo!");

        await confirmOrder(
          orderId,
          amount,
          paymentIntent.id,
          paymentIntent.client_secret,
          paymentIntent.status,
        );
      }
    } catch (err) {
      console.error("Errore nella gestione del pagamento:", err);
      setError(err.message || "Errore imprevisto durante il pagamento.");
    } finally {
      setLoading(false);
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center"
      >
        <div className="spinner" />
        <span>Caricamento metodi di pagamento in corso...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {clientSecret && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <fieldset className="space-y-4">
            <legend className="sr-only">Dettagli pagamento con carta</legend>
            <PaymentElement options={{ layout: "auto" }} />
          </fieldset>

          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="bg-primary-950/10 text-primary-950 flex max-w-full items-start gap-2 rounded-lg p-2 text-xs sm:text-sm"
            >
              <HiOutlineExclamationCircle
                aria-hidden="true"
                className="size-5 shrink-0"
              />
              <span className="self-center hyphens-auto">{error}</span>
            </div>
          )}

          {disabled && (
            <div
              role="alert"
              aria-live="polite"
              className="bg-primary-950/10 text-primary-950 flex max-w-full items-start gap-2 rounded-lg p-2 text-sm sm:text-base"
            >
              <HiOutlineExclamationCircle
                aria-hidden="true"
                className="size-5 shrink-0"
              />
              <span className="self-center hyphens-auto">
                Inserisci le informazioni sulla spedizione per poter continuare.
              </span>
            </div>
          )}

          <Button
            type="submit"
            disabled={!stripe || loading || disabled}
            aria-disabled={!stripe || loading || disabled}
            aria-busy={loading ? "true" : "false"}
            className="rounded py-2 text-lg font-bold disabled:font-light"
          >
            {loading ? "Elaborazione..." : `Paga ${formatCurrency(amount)}`}
          </Button>
        </form>
      )}
    </div>
  );
}
