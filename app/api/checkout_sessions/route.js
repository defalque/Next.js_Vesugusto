import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { getCartProd } from "@/app/_lib/data-service";
import { stripe } from "@/app/_lib/stripe";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const { isAuthenticated, userId } = await auth();
    if (!isAuthenticated) {
      return new NextResponse({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();

    const { cartId, cartProducts: products } = await getCartProd();

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: "Nessun prodotto nel carrello." },
        { status: 400 },
      );
    }

    const lineItems = products.map((product) => {
      const images = Array.isArray(product.product.image)
        ? product.product.image
        : product.product.image
          ? [product.product.image]
          : [];

      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: product.product.name,
            images,
            ...(product.product.details
              ? { description: product.product.details }
              : {}),
          },
          unit_amount: product.product.regularPrice,
        },
        quantity: product.quantity,
      };
    });

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "required",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items: lineItems,
      mode: "payment",
      invoice_creation: {
        enabled: true,
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart/checkout?canceled=true`,
      // success_url: `${process.env.NEXT_PUBLIC_PROD_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      // cancel_url: `${process.env.NEXT_PUBLIC_PROD_URL}/cart/checkout?canceled=true`,
      metadata: {
        userId: userId,
        cartId: cartId,
        name: user.firstName + " " + user.lastName,
        email: user.emailAddresses.at(0).emailAddress,
      },
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
