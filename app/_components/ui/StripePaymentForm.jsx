// "use client";

// import { useEffect, useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { formatPrice } from "@/app/_lib/formatPrice";

// export default function StripePaymentForm({ totalAmount, userId, cartId }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const createPaymentIntent = async () => {
//       try {
//         const res = await fetch("/api/create-payment-intent", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount: totalAmount * 100 }),
//         });

//         if (!res.ok) {
//           throw new Error("Errore nella creazione del PaymentIntent");
//         }

//         const data = await res.json();
//         setClientSecret(data.clientSecret);
//       } catch (err) {
//         console.error(err);
//         setError("Errore nella comunicazione con il server.");
//       }
//     };

//     createPaymentIntent();
//   }, [totalAmount]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!stripe || !elements || !clientSecret) return;

//     const cardElement = elements.getElement(CardElement);

//     const { error, paymentIntent } = await stripe.confirmCardPayment(
//       clientSecret,
//       {
//         payment_method: {
//           card: cardElement,
//         },
//       }
//     );

//     if (error) {
//       setError(error.message || "Errore nel pagamento.");
//       setLoading(false);
//     } else if (paymentIntent && paymentIntent.status === "succeeded") {
//       // CREAZIONE ORDINE
//       const res = await fetch("/api/create-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId,
//           cartId,
//           paymentIntentId: paymentIntent.id,
//         }),
//       });

//       if (res.ok) {
//         // ✅ Redirect client-side al success
//         window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/success?payment_intent=${paymentIntent.id}`;
//       } else {
//         setError("Ordine creato ma errore nel salvataggio.");
//       }

//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: "16px",
//               color: "#333",
//               "::placeholder": { color: "#aab7c4" },
//             },
//             invalid: { color: "#fa5252" },
//           },
//         }}
//       />

//       {error && <p className="text-primary-950 text-sm">{error}</p>}

//       <button
//         type="submit"
//         disabled={!stripe || loading || success}
//         className="cursor-pointer hover:bg-primary-900 bg-primary-950 text-primary-50 rounded-xl py-3 px-6 disabled:animate-pulse font-semibold"
//       >
//         {loading ? "Elaborazione..." : `Paga  ${formatPrice(totalAmount)}`}
//       </button>

//       {success && (
//         <p className="text-green-500 font-semibold">
//           Pagamento completato con successo!
//         </p>
//       )}
//     </form>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import {
//   CardElement,
//   useStripe,
//   useElements,
//   PaymentRequestButtonElement,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import { formatPrice } from "@/app/_lib/formatPrice";

// export default function StripePaymentForm({ totalAmount, userId, cartId }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [clientSecret, setClientSecret] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [paymentRequest, setPaymentRequest] = useState(null);

//   // Creazione PaymentIntent
//   useEffect(() => {
//     console.log("stripe:", stripe); // 👈 verifica se è null
//     const createPaymentIntent = async () => {
//       try {
//         const res = await fetch("/api/create-payment-intent", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount: totalAmount * 100 }),
//         });

//         if (!res.ok)
//           throw new Error("Errore nella creazione del PaymentIntent");
//         const data = await res.json();
//         setClientSecret(data.clientSecret);
//       } catch (err) {
//         console.error(err);
//         setError("Errore nella comunicazione con il server.");
//       }
//     };

//     createPaymentIntent();
//   }, [totalAmount]);

//   // Configura PaymentRequest (Apple Pay / Google Pay)
//   useEffect(() => {
//     if (stripe) {
//       const pr = stripe.paymentRequest({
//         country: "IT",
//         currency: "eur",
//         total: {
//           label: "Totale ordine",
//           amount: totalAmount * 100,
//         },
//         requestPayerName: true,
//         requestPayerEmail: true,
//       });

//       pr.canMakePayment().then((result) => {
//         console.log("canMakePayment result", result);
//         if (result) {
//           setPaymentRequest(pr);
//         }
//       });
//     }
//   }, [stripe, totalAmount]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!stripe || !elements || !clientSecret) return;

//     const cardElement = elements.getElement(CardElement);
//     const { error, paymentIntent } = await stripe.confirmCardPayment(
//       clientSecret,
//       {
//         payment_method: { card: cardElement },
//       }
//     );

//     if (error) {
//       setError(error.message || "Errore nel pagamento.");
//       setLoading(false);
//     } else if (paymentIntent && paymentIntent.status === "succeeded") {
//       await fetch("/api/create-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId,
//           cartId,
//           paymentIntentId: paymentIntent.id,
//         }),
//       });
//       window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/success?payment_intent=${paymentIntent.id}`;
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4 mt-6">
//       {/* Apple Pay / Google Pay button se disponibile */}
//       {paymentRequest && (
//         <PaymentRequestButtonElement
//           options={{ paymentRequest }}
//           className="mb-4"
//         />
//       )}

//       {/* Card Payment form */}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#333",
//                 "::placeholder": { color: "#aab7c4" },
//               },
//               invalid: { color: "#fa5252" },
//             },
//           }}
//         />

//         {error && <p className="text-primary-950 text-sm">{error}</p>}

//         <button
//           type="submit"
//           disabled={!stripe || loading || success}
//           className="cursor-pointer hover:bg-primary-900 bg-primary-950 text-primary-50 rounded-xl py-3 px-6 disabled:animate-pulse font-semibold"
//         >
//           {loading ? "Elaborazione..." : `Paga ${formatPrice(totalAmount)}`}
//         </button>

//         {success && (
//           <p className="text-green-500 font-semibold">
//             Pagamento completato con successo!
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { formatPrice } from "@/app/_lib/formatPrice";

export default function StripePaymentForm({ totalAmount, userId, cartId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Creazione PaymentIntent
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalAmount * 100 }),
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
  }, [totalAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setError(error.message || "Errore nel pagamento.");
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          cartId,
          paymentIntentId: paymentIntent.id,
        }),
      });
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/success?payment_intent=${paymentIntent.id}`;
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      {clientSecret && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <PaymentElement
            options={{
              layout: "tabs", // puoi scegliere anche 'accordion' o 'auto'
            }}
          />

          {error && <p className="text-primary-950 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={!stripe || loading || success}
            className="cursor-pointer hover:bg-primary-900 bg-primary-950 text-primary-50 rounded-xl py-3 px-6 disabled:animate-pulse font-semibold"
          >
            {loading ? "Elaborazione..." : `Paga ${formatPrice(totalAmount)}`}
          </button>

          {success && (
            <p className="text-green-500 font-semibold">
              Pagamento completato con successo!
            </p>
          )}
        </form>
      )}
    </div>
  );
}
