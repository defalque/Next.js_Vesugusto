// "use client";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import StripePaymentForm from "@/app/_components/ui/StripePaymentForm";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// function PaymentForm({ total, userId, cartId }) {
//   return (
//     <Elements stripe={stripePromise}>
//       <StripePaymentForm totalAmount={total} userId={userId} cartId={cartId} />
//     </Elements>
//   );
// }

// export default PaymentForm;

// "use client";

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import StripePaymentForm from "@/components/StripePaymentForm";

// // Carica la chiave pubblica di Stripe
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// export default function PaymentForm() {
//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     const createPaymentIntent = async () => {
//       const res = await fetch("/api/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: 5000 }),
//       });
//       const data = await res.json();
//       setClientSecret(data.clientSecret);
//     };

//     createPaymentIntent();
//   }, []);

//   const appearance = {
//     theme: "stripe",
//   };

//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Pagamento</h1>

//       {clientSecret && (
//         <Elements stripe={stripePromise} options={options}>
//           <StripePaymentForm totalAmount={50} userId="123" cartId="456" />
//         </Elements>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "@/app/_components/ui/StripePaymentForm";
import SpinnerMini from "./SpinnerMiniColored";
import Spinner from "./Spinner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function PaymentForm({ total, userId, cartId }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [theme, setTheme] = useState("stripe");

  useEffect(() => {
    const createPaymentIntent = async () => {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total * 100 }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, [total]);

  useEffect(() => {
    const updateTheme = () => {
      if (document.documentElement.classList.contains("dark")) {
        setTheme("night");
      } else {
        setTheme("stripe");
      }
    };

    updateTheme(); // imposta il tema al primo render

    // Osserva i cambiamenti nella classe `dark`
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme,
    },
  };

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-5">
        <Spinner></Spinner>;
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripePaymentForm totalAmount={total} userId={userId} cartId={cartId} />
    </Elements>
  );
}

export default PaymentForm;
