// import { NextResponse } from "next/server";
// import { fulfillCheckout } from "@/app/_lib/actions";
// import { stripe } from "@/app/_lib/stripe";

// export async function POST(req) {
//   console.log("Sono in webhook");
//   const body = await req.text();
//   const sig = req.headers.get("stripe-signature");

//   if (!process.env.STRIPE_WEBHOOK_SECRET) {
//     throw new Error("STRIPE_WEBHOOK_SECRET is missing!");
//   }

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET,
//     );
//   } catch (err) {
//     console.error("❌ Webhook error.", err);
//     return NextResponse.json(
//       { error: `Webhook Error: ${err.message}` },
//       { status: 400 },
//     );
//   }

//   // Intercetta l'evento di sessione completata
//   if (
//     event.type === "checkout.session.completed" ||
//     event.type === "checkout.session.async_payment_succeeded"
//   ) {
//     try {
//       const id = await fulfillCheckout(event.data.object.id);

//       console.log(
//         "✅ Ordine creato con successo dopo pagamento! Il suo ID è: ",
//         id,
//       );
//     } catch (error) {
//       console.error("❌ Errore nella creazione ordine dal webhook: ", error);
//       return NextResponse.json(
//         { error: `Errore nel salvataggio dell'ordine: ${error}` },
//         { status: 500 },
//       );
//     }
//   }

//   return NextResponse.json({ received: true });
// }

// app/api/stripe-webhook/route.js
import { NextResponse } from "next/server";
import { fulfillCheckout } from "@/app/_lib/actions";
import { stripe } from "@/app/_lib/stripe";

// Configurazione importante per Next.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  console.log("🔔 Webhook ricevuto");

  let body;
  let sig;

  try {
    // Leggi il body raw
    body = await req.text();
    sig = req.headers.get("stripe-signature");

    if (!sig) {
      console.error("❌ Firma Stripe mancante");
      return NextResponse.json(
        { error: "Firma Stripe mancante" },
        { status: 400 },
      );
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("❌ STRIPE_WEBHOOK_SECRET non configurato");
      throw new Error("STRIPE_WEBHOOK_SECRET is missing!");
    }

    console.log("🔍 Verifica firma Stripe...");
  } catch (err) {
    console.error("❌ Errore nel processamento richiesta:", err);
    return NextResponse.json(
      { error: `Errore richiesta: ${err.message}` },
      { status: 400 },
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
    console.log("✅ Evento verificato:", event.type);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  // Gestisci eventi di pagamento completato
  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    console.log("💳 Pagamento completato, session ID:", event.data.object.id);

    try {
      const orderId = await fulfillCheckout(event.data.object.id);
      console.log("✅ Ordine creato con successo! ID:", orderId);

      return NextResponse.json({
        received: true,
        orderId,
      });
    } catch (error) {
      console.error("❌ Errore nella creazione ordine:", error);
      // Ritorna 200 per non far riprovare Stripe continuamente
      return NextResponse.json(
        {
          received: true,
          error: `Errore nel salvataggio dell'ordine: ${error.message}`,
        },
        { status: 200 },
      );
    }
  }

  console.log(`ℹ️ Evento ${event.type} ricevuto ma non gestito`);
  return NextResponse.json({ received: true });
}
