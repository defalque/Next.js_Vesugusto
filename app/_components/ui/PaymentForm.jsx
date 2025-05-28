"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "@/app/_components/ui/StripePaymentForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function PaymentForm({ total, userId, cartId }) {
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm totalAmount={total} userId={userId} cartId={cartId} />
    </Elements>
  );
}

export default PaymentForm;
