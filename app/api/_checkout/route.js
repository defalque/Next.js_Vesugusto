import { getCartProducts } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  const session = await auth();
  const products = await getCartProducts(session.user.cartId);

  if (!products || products.length === 0) {
    return NextResponse.json(
      { error: "Nessun prodotto nel carrello" },
      { status: 400 },
    );
  }

  try {
    const lineItems = products.map((product) => {
      const productData = {
        name: product.name,
        images: product.image ? [product.image.at(0)] : [],
      };

      if (product.details) {
        productData.description = product.details;
      }

      return {
        price_data: {
          currency: "eur",
          product_data: productData,
          unit_amount: product.regularPrice * 100,
        },
        quantity: product.cartQuantity,
      };
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        userId: session.user.userId,
        name: session.user.name,
        email: session.user.email,
        cartId: session.user.cartId,
      },
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (err) {
    console.error("Errore Stripe:", err);
    return NextResponse.json(
      { error: "Errore nella creazione della sessione" },
      { status: 500 },
    );
  }
}
