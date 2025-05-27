import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createOrder } from "@/app/_lib/actions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text(); // il corpo della richiesta in raw, obbligatorio per verificare la firma
  const sig = req.headers.get("stripe-signature"); // la firma che Stripe manda

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // la secret che ti ha dato Stripe
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed.", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Intercetta l'evento di sessione completata
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // Recupera i dati dal metadata della sessione
      const userId = session.metadata.userId;
      const cartId = session.metadata.cartId;

      await createOrder(userId, cartId, session.id);

      console.log("✅ Ordine creato con successo dopo pagamento!");
    } catch (error) {
      console.error("❌ Errore nella creazione ordine dal webhook", error);
      return NextResponse.json(
        { error: "Errore nel salvataggio ordine" },
        { status: 500 }
      );
    }
  }

  // Risposta a Stripe per confermare che abbiamo ricevuto e gestito il webhook
  return NextResponse.json({ received: true });
}
