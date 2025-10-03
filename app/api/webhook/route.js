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
import { headers } from "next/headers";

export async function POST(req) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET is missing!");
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      (await headers()).get("stripe-signature"),
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("❌ Webhook error.", err);

    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );

    // const errorMessage = err.message;
    // // On error, log and return the error message.
    // if (err) console.log(err);
    // console.log(`Error message: ${errorMessage}`);
    // return NextResponse.json(
    //   { message: `Webhook Error: ${errorMessage}` },
    //   { status: 400 },
    // );
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

  // const permittedEvents = [
  //   "checkout.session.completed",
  //   "checkout.session.async_payment_succeeded",
  // ];

  // if (permittedEvents.includes(event.type)) {
  //   let data;

  //   try {
  //     switch (event.type) {
  //       case "checkout.session.completed":
  //         data = event.data.object;
  //         console.log(
  //           `CheckoutSessionCompleted status: ${data.payment_status}`,
  //         );
  //         break;
  //       case "checkout.session.async_payment_succeeded":
  //         data = event.data.object;
  //         console.log(
  //           `CheckoutSessionAsyncPaymentSucceeded status: ${data.payment_status}`,
  //         );
  //         break;
  //       default:
  //         throw new Error(`Unhandled event: ${event.type}`);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return NextResponse.json(
  //       { message: "Webhook handler failed" },
  //       { status: 500 },
  //     );
  //   }
  // }

  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: "Received" }, { status: 200 });
}
