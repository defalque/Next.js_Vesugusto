"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "@/app/_components/cart/checkout/StripePaymentForm";
import usePrefersDarkMode from "@/app/_hooks/usePrefersDarkMode";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY non è definita!");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function PaymentForm({ amount, userId, cartId, name, email, disabled }) {
  const isDarkMode = usePrefersDarkMode();

  const appearance = {
    theme: "flat",
    labels: "floating",
    variables: {
      fontWeightNormal: "500",
      borderRadius: "8px",
      colorBackground: isDarkMode ? "#212529" : "#FFFFFF",
      colorPrimary: "#fa5252",
      accessibleColorOnColorPrimary: isDarkMode ? "#1A1B25" : "#FFFFFF",
      colorText: isDarkMode ? "white" : "#1A1B25",
      colorTextSecondary: isDarkMode ? "white" : "#4B5563",
      colorTextPlaceholder: isDarkMode ? "#ABB2BF" : "#6B7280",
      colorDanger: isDarkMode ? "#fa5252" : "#ff6b6b",
    },
    rules: {
      ".Input": {
        backgroundColor: isDarkMode ? "oklch(21% 0.006 285.885)" : "#FFFFFF",
        border: `1px solid ${isDarkMode ? "oklch(27.4% 0.006 286.033)" : "#D1D5DB"}`,
      },
    },
  };

  return (
    <Elements
      stripe={stripePromise}
      options={{
        amount,
        currency: "eur",
        mode: "payment",
        loader: "auto",
        appearance,
      }}
    >
      <StripePaymentForm
        amount={amount}
        userId={userId}
        cartId={cartId}
        name={name}
        email={email}
        disabled={disabled}
      />
    </Elements>
  );
}

export default PaymentForm;
