import { NextResponse } from "next/server";
import { fulfillCheckout } from "@/app/_lib/actions";
import { stripe } from "@/app/_lib/stripe";

// ✅ Serve per disabilitare il parsing automatico del body
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  console.log("Sono in webhook");
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET is missing!");
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("❌ Webhook error.", err);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  // Intercetta l'evento di sessione completata
  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    try {
      const id = await fulfillCheckout(event.data.object.id);

      console.log(
        "✅ Ordine creato con successo dopo pagamento! Il suo ID è: ",
        id,
      );
    } catch (error) {
      console.error("❌ Errore nella creazione ordine dal webhook: ", error);
      return NextResponse.json(
        { error: `Errore nel salvataggio dell'ordine: ${error}` },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}
