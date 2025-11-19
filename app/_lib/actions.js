"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { supabase } from "./supabase";
import { revalidateTag, updateTag } from "next/cache";
import { updateProfileSchema } from "./schemas/updateProfileSchema";
import { resend } from "./resend";
import WelcomeEmail from "../_emails/WelcomeEmail";
import ConfirmedOrderEmail from "../_emails/ConfirmedOrderEmail";
import { getOrderItems } from "./data-service";
import { formatCurrency } from "./formatCurrency";
import { stripe } from "./stripe";
import { clerkClient } from "@clerk/nextjs/server";

export async function createSupabaseUser(user) {
  const { email, firstName, lastName, image, userId } = user;

  const { data, error: createError } = await supabase.rpc(
    "create_get_user_and_cart",
    {
      p_email: email,
      p_firstname: firstName,
      p_lastname: lastName,
      p_image: image,
      p_userid: userId,
    },
  );

  if (createError) {
    console.error("Errore nella creazione dell'utente:", createError);
    throw new Error("Impossibile creare l'utente.");
  }
  const { user_id, cart_id } = data[0];

  const client = await clerkClient();

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      databaseId: user_id,
      cartId: cart_id,
    },
  });

  const { emailError } = await resend.emails.send({
    from: "Vesugusto <noreply@vesugusto.dev>",
    // to: ["marcodefalco2017@libero.it"],
    to: [email],
    subject: "Benvenuto su Vesugusto",
    react: WelcomeEmail({ username: firstName }),
  });

  if (emailError) {
    console.error("Errore nell'invio dell'email di benvenuto:", emailError);
    throw new Error("Impossibile inviare email di benvenuto.");
  }

  return { user_id, cart_id };
}

//----------------------------------------------------------- ✅
export async function deleteSupabaseUser(id) {
  const { error } = await supabase.from("users").delete().eq("clerkUserId", id);

  if (error) {
    console.error("Impossibile eliminare utente: ", error);
    throw new Error("Impossibile eliminare utente al momento.");
  }
}

//----------------------------------------------------------- ✅
export async function updateUserProfile(data) {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) {
    throw new Error("Devi essere loggato per effettuare questa azione!");
  }

  const validationData = {
    via: data.via.slice(0, 1000),
    numeroCivico: data.numeroCivico.slice(0, 1000),
    comune: data.comune.slice(0, 1000),
    cap: data.cap.slice(0, 1000),
    ...(data.phoneNumber && { phoneNumber: data.phoneNumber.slice(0, 1000) }),
  };

  const validatedFields = updateProfileSchema.safeParse(validationData);

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.issues);
    throw new Error(
      "Dati non validi: " +
        validatedFields.error.issues.map((i) => i.message).join(", "),
    );
  }

  const { error } = await supabase
    .from("users")
    .update(validatedFields.data)
    .eq("clerkUserId", userId);

  if (error) {
    console.error("Non è stato possibile modificare info utente: ", error);
    throw new Error("Non è stato possibile modificare info utente.");
  }

  updateTag(`${userId}-info`);
}

//----------------------------------------------------------- ✅
export async function addFavoriteProduct(productId) {
  const { isAuthenticated, userId: clerkUserId } = await auth();
  if (!isAuthenticated) {
    throw new Error("Devi essere loggato per effettuare questa azione!");
  }

  const user = await currentUser();
  const userId = user.privateMetadata.databaseId;

  const { error: insertError } = await supabase
    .from("favorites")
    .insert([{ userId, productId, clerkUserId }])
    .select();

  if (insertError) {
    console.error("Errore durante l'inserimento:", insertError);
    throw new Error(
      "Non è stato possibile inserire il prodotto tra i preferiti.",
    );
  }

  updateTag(`favorites-${clerkUserId}`);
}

//----------------------------------------------------------- ✅
export async function deleteFavoriteProduct(productId) {
  const { isAuthenticated, userId: clerkUserId } = await auth();
  if (!isAuthenticated) {
    throw new Error("Devi essere loggato per effettuare questa azione!");
  }

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("clerkUserId", clerkUserId)
    .eq("productId", productId);

  if (error) {
    console.error(error);
    throw new Error(
      "Non è stato possibile eliminare il prodotto dai preferiti.",
    );
  }

  updateTag(`favorites-${clerkUserId}`);
}

//----------------------------------------------------------- ✅
export async function addCartItem(productId, quantity) {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) {
    throw new Error("Devi essere loggato per effettuare questa azione!");
  }

  const { error } = await supabase.rpc("increment_cart_and_decrement_stock", {
    p_user_id: userId,
    p_product_id: productId,
    p_amount: quantity,
  });

  if (error) {
    console.error("Errore addCartItem RPC:", error);
    throw new Error("Errore durante l'aggiunta del prodotto al carrello.");
  }

  updateTag(`cart-${userId}`);
  updateTag(`${userId}-cart-count`);
}

//----------------------------------------------------------- ✅
export async function addFavoriteToCartAndDeleteFavorite(productId) {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) {
    throw new Error("Devi essere loggato per effettuare questa azione!");
  }

  const { error } = await supabase.rpc(
    "increment_cart_decrement_stock_delete_favorite",
    {
      p_user_id: userId,
      p_product_id: productId,
      p_amount: 1,
    },
  );

  if (error) {
    console.error("Errore RPC:", error);
    throw new Error("Errore durante l'aggiunta del prodotto al carrello.");
  }

  updateTag(`favorites-${userId}`);
  updateTag(`cart-${userId}`);
  updateTag(`${userId}-cart-count`);
}

//----------------------------------------------------------- ✅
export async function updateCartItem(cartId, productId, newCartItemQuantity) {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) {
    throw new Error("Devi essere loggato per effettuare questa azione!");
  }

  if (
    isNaN(Number(newCartItemQuantity)) ||
    Number(newCartItemQuantity) < 1 ||
    Number(newCartItemQuantity) > 10
  ) {
    console.error("Invalid newCartItemQuantity:", newCartItemQuantity);
    throw new Error("Quantità non valida.");
  }

  const { error } = await supabase.rpc("update_cart_and_decrement_stock", {
    p_cart_id: cartId,
    p_product_id: productId,
    p_new_quantity: newCartItemQuantity,
  });

  if (error) {
    console.error("Errore transazionale:", error);
    throw new Error("Errore durante l'aggiornamento atomico.");
  }

  updateTag(`cart-${userId}`);
  // updateTag(`${userId}-cart-count`);
}

//----------------------------------------------------------- ✅
export async function deleteCartItem(cartId, productId) {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) {
    throw new Error("Devi essere loggato per effettuare questa azione!");
  }

  const { error } = await supabase.rpc(
    "delete_cart_item_and_increment_quantity",
    {
      p_cart_id: cartId,
      p_product_id: productId,
    },
  );

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  updateTag(`cart-${userId}`);
  updateTag(`${userId}-cart-count`);
}

export async function createOrder(cartId, name, email, totalCost) {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) {
    throw new Error("Devi essere loggato per effettuare questa azione!");
  }

  const { data, error } = await supabase.rpc("create_order", {
    user_id: userId,
    cart_id: cartId,
    name: name,
    email: email,
    total_cost: totalCost,
  });

  if (error) {
    console.error("Errore nella creazione ordine atomica", error);
    throw new Error("Errore nella creazione ordine atomica");
  }

  return data;
}

export async function confirmOrder(
  orderId,
  totalCost,
  paymentIntentId,
  paymentIntentClientSecret,
  paymentIntentStatus,
) {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    throw new Error("Devi essere loggato per effettuare questa azione!");
  }

  const { error } = await supabase
    .from("orders")
    .update({
      status: "unconfirmed",
      paymentIntent: paymentIntentId,
      isTokenUsed: false,
    })
    .eq("id", orderId);

  if (error) {
    console.error("Errore nell'aggiornamento dell'ordine", error);
    throw new Error("Errore nell'aggiornamento dell'ordine");
  }

  // redirect(
  //   `/payment-success?amount=${totalCost}&payment_intent=${paymentIntentId}&payment_intent_client_secret=${paymentIntentClientSecret}&redirect_status=${paymentIntentStatus}`,
  //   // `/payment-success/amount?=${totalCost}&payment_intent=${paymentIntentId}&payment_intent_client_secret=${paymentIntentClientSecret}&redirect_status=${paymentIntentStatus}`,
  // );
}

//----------------------------------------------------------- ✅
export async function simulateOrder(cartId, totalCost) {
  const { isAuthenticated, userId } = await auth();
  if (!isAuthenticated) {
    throw new Error("Devi essere loggato per effettuare questa azione!");
  }

  const { data: id, error } = await supabase.rpc("simulate_full_order", {
    user_id: userId,
    cart_id: cartId,
    total_cost: totalCost,
  });

  if (error) {
    console.error("Errore nella creazione ordine atomica", error);
    throw new Error("Errore nella creazione ordine atomica");
  }

  if (!id) {
    throw new Error(
      "Nessun ID ordine restituito dalla funzione simulate_full_order",
    );
  }

  const user = await currentUser();
  const data = await getOrderItems(id);

  // ✅ Invio email al cliente dopo conferma ordine
  const { emailError } = await resend.emails.send({
    from: "Vesugusto <noreply@vesugusto.dev>",
    to: [user.emailAddresses.at(0).emailAddress],
    // to: ["marcodefalco2017@libero.it"],
    subject: "Conferma del tuo ordine su Vesugusto",
    react: ConfirmedOrderEmail({
      id: id,
      username: user.firstName + " " + user.lastName,
      items: data.map((item) => ({
        id: item.id,
        name: item.product.name,
        quantity: item.quantity,
        price: formatCurrency(item.orderItemPrice),
        image: item.product.image,
      })),
      total: formatCurrency(totalCost),
    }),
  });

  if (emailError) {
    console.error("Errore nell'invio dell'email di benvenuto:", emailError);
    throw new Error("Impossibile inviare email di benvenuto.");
  }

  updateTag(`cart-${userId}`);
  updateTag(`${userId}-cart-count`);
  updateTag(`${userId}-orders-count`);
  updateTag(`orders-${userId}`);
}

//----------------------------------------------------------- ✅
export async function invalidateOrderToken(orderId) {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    throw new Error("Devi essere loggato per effettuare questa azione!");
  }

  const { error } = await supabase
    .from("orders")
    .update({
      isTokenUsed: true,
    })
    .eq("id", orderId);

  if (error) {
    console.error("Errore nell'aggiornamento del token dell'ordine", error);
    throw new Error("Errore nell'aggiornamento del token dell'ordine");
  }

  return true;
}

//----------------------------------------------------------- ✅
export async function fulfillCheckout(sessionId) {
  // TODO: Make this function safe to run multiple times,
  // even concurrently, with the same session ID

  // TODO: Make sure fulfillment hasn't already been
  // performed for this Checkout Session

  // Retrieve the Checkout Session from the API with line_items expanded
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  // Check the Checkout Session's payment_status property
  // to determine if fulfillment should be performed
  if (checkoutSession.payment_status !== "unpaid") {
    // TODO: Perform fulfillment of the line items
    // TODO: Record/save fulfillment status for this
    // Checkout Session

    const userId = checkoutSession.metadata.userId;
    const cartId = checkoutSession.metadata.cartId;
    const name = checkoutSession.metadata.name;
    const email = checkoutSession.metadata.email;
    const totalCost = checkoutSession.amount_total;

    const { data: orderId, error } = await supabase.rpc(
      "check_sessionid_create_order",
      {
        cart_id: cartId,
        email: email,
        name: name,
        session_id: checkoutSession.id,
        total_cost: totalCost,
        user_id: userId,
      },
    );

    if (error) {
      console.error("Errore nella creazione ordine atomica: ", error);
      throw new Error("Errore nella creazione ordine atomica.");
    }

    let invoicePdfUrl = null;

    if (checkoutSession.invoice) {
      const invoice = await stripe.invoices.retrieve(checkoutSession.invoice);
      invoicePdfUrl = invoice.invoice_pdf;
    }

    const orderItems = await getOrderItems(orderId);

    // Invia email di conferma ordine
    const { error: emailError } = await resend.emails.send({
      from: "Vesugusto <noreply@vesugusto.dev>",
      to: [email], // in produzione
      // to: ["marcodefalco2017@libero.it"], // in sviluppo
      subject: "Conferma del tuo ordine su Vesugusto",
      react: ConfirmedOrderEmail({
        id: orderId,
        username: name,
        items: orderItems.map((item) => ({
          id: item.id,
          name: item.product.name,
          quantity: item.quantity,
          price: formatCurrency(item.orderItemPrice),
          image: item.product.image,
        })),
        total: formatCurrency(totalCost),
        invoiceUrl: invoicePdfUrl,
      }),
    });

    if (emailError) {
      console.error("Errore nell'invio email conferma ordine:", emailError);
      // puoi decidere se rilanciare o continuare
    }

    revalidateTag(`cart-${userId}`, "max");
    revalidateTag(`${userId}-cart-count`, "max");
    revalidateTag(`${userId}-orders-count`, "max");
    revalidateTag(`orders-${userId}`, "max");

    return orderId;
  }
}
