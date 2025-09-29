"use server";

import { auth, signIn, signOut } from "@/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { updateProfileSchema } from "./schemas/updateProfileSchema";
import { redirect } from "next/navigation";
// import { resend } from "./resend";
// import { WelcomeEmail } from "../_components/ui/EmailTemplate";

export async function createUser(email, name, image) {
  const { error: createError } = await supabase.rpc(
    "create_user_and_cart_atomic",
    {
      p_email: email,
      p_name: name,
      p_image: image,
    },
  );

  // if (createError) {
  //   console.error("Errore nella creazione dell'utente:", createError);
  //   throw new Error("Impossibile creare l'utente.");
  // }

  // Sposta in account
  // const { emailError } = await resend.emails.send({
  //   from: "Vesugusto <noreply@resend.dev>",
  //   to: ["marcodefalco2017@libero.it"],
  //   // to: [email],
  //   subject: "Benvenuto su Vesugusto",
  //   react: WelcomeEmail({ username: name }),
  // });

  // if (emailError) {
  //   console.error("Errore nell'invio dell'email di benvenuto:", emailError);
  //   throw new Error("Impossibile inviare email di benvenuto.");
  // }
}

//----------------------------------------------------------- ✅
export async function googleSignInAction() {
  await signIn("google", { redirectTo: "/account" });
}

//----------------------------------------------------------- ✅
export async function githubSignInAction() {
  await signIn("github", { redirectTo: "/account" });
}

//----------------------------------------------------------- ✅
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

//----------------------------------------------------------- ✅
export async function updateUserProfile(data) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // console.log(data);

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
  // console.log(validatedFields);

  const { error } = await supabase
    .from("users")
    .update(validatedFields.data)
    .eq("id", session.user.userId);

  if (error) throw new Error("User could not be updated");

  revalidatePath("/account");

  return true;
}

//----------------------------------------------------------- ✅
export async function updateAddressInfo(data) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const validationData = {
    via: data.via.slice(0, 1000),
    numeroCivico: data.numeroCivico.slice(0, 1000),
    comune: data.comune.slice(0, 1000),
    cap: data.cap.slice(0, 1000),
  };

  const validatedFields = updateProfileSchema.safeParse(validationData);

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.issues);
    throw new Error(
      "Dati non validi: " +
        validatedFields.error.issues.map((i) => i.message).join(", "),
    );
  }
  // console.log(validatedFields);

  const { error } = await supabase
    .from("users")
    .update(validatedFields.data)
    .eq("id", session.user.userId);

  if (error) {
    console.error("Errore Supabase:", error);
    throw new Error("Errore nel salvataggio dei dati. Riprova più tardi.");
  }

  revalidatePath("/cart/checkout");

  return true;
}

//----------------------------------------------------------- ✅
export async function addFavorite(userId, productId) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to perform this action!");

  // const { data: existing, error: checkError } = await supabase
  //   .from("favorites")
  //   .select("*")
  //   .eq("userId", userId)
  //   .eq("productId", productId);

  // if (checkError) {
  //   console.error("Errore durante il controllo:", checkError);
  //   throw new Error("Errore durante il fetching dei preferiti.");
  // }

  // if (existing.length > 0) {
  //   console.log("Già nei preferiti");
  //   return false;
  // }

  const { error: insertError } = await supabase
    .from("favorites")
    .insert([{ userId, productId }])
    .select();

  if (insertError) {
    console.error("Errore durante l'inserimento:", insertError);
    throw new Error(
      "Non è stato possibile inserire il prodotto tra i preferiti.",
    );
  }

  revalidatePath("/shop");
}

//----------------------------------------------------------- ✅
export async function deleteFavorite(userId, productId) {
  const session = await auth();
  if (!session)
    throw new Error("You must be logged in to perform this action!");

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("userId", userId)
    .eq("productId", productId);

  if (error) {
    console.error(error);
    throw new Error(
      "Non è stato possibile eliminare il prodotto dai preferiti.",
    );
  }

  revalidatePath("/account/favorites");
  revalidatePath("/shop");
}

//----------------------------------------------------------- ✅
export async function addCartItem(cartId, productId, quantity) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // const { data: availability, error: availabilityError } = await supabase
  //   .from("products")
  //   .select("quantity")
  //   .eq("id", productId)
  //   .single();

  // if (availabilityError) {
  //   console.error(
  //     "Errore durante il fetching della disponibilità del prodotto:",
  //     availabilityError
  //   );
  //   throw new Error(
  //     "Errore durante il fetching della disponibilità del prodotto."
  //   );
  // }

  // if (!availability || availability.quantity < quantity) {
  //   throw new Error("Quantità richiesta non disponibile");
  // }

  // ------------------------ ATOMICA ----------------------------------

  const { error } = await supabase.rpc("increment_cart_and_decrement_stock", {
    p_cart_id: cartId,
    p_product_id: productId,
    p_amount: quantity,
  });

  if (error) {
    console.error("Errore RPC:", error);
    throw new Error("Errore durante l'aggiunta del prodotto al carrello.");
  }

  revalidatePath(`/`);
}

export async function addFavoriteToCartAndDeleteFavorite(
  userId,
  cartId,
  productId,
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase.rpc(
    "increment_cart_decrement_stock_delete_favorite",
    {
      p_user_id: userId,
      p_cart_id: cartId,
      p_product_id: productId,
      p_amount: 1,
    },
  );

  if (error) {
    console.error("Errore RPC:", error);
    throw new Error("Errore durante l'aggiunta del prodotto al carrello.");
  }

  revalidatePath(`/`);
}

//----------------------------------------------------------- 🤔 forse si può migliorare
export async function updateCartItem(cartId, productId, newCartItemQuantity) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  if (
    isNaN(Number(newCartItemQuantity)) ||
    Number(newCartItemQuantity) < 1 ||
    Number(newCartItemQuantity) > 10
  ) {
    console.error("Invalid newCartItemQuantity:", newCartItemQuantity);
    throw new Error("Quantità non valida.");
  }

  const { data: cartItem, error: cartItemError } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("cartId", cartId)
    .eq("productId", productId)
    .single();

  if (cartItemError) {
    console.error(
      "Errore durante il fetching della quantità del prodotto nel carrello:",
      checkError,
    );
    throw new Error(
      "Errore durante il fetching della quantità del prodotto nel carrello.",
    );
  }

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("quantity")
    .eq("id", productId)
    .single();

  if (productError) {
    console.error(
      "Errore durante il fetching della quantità del prodotto:",
      productError,
    );
    throw new Error("Errore durante il fetching della quantità del prodotto.");
  }

  if (newCartItemQuantity > product.quantity + cartItem.quantity) {
    console.error("Scorte insufficienti");
    throw new Error("Scorte insufficienti.");
  }

  // ------------------------ ATOMICA ----------------------------------

  const delta = newCartItemQuantity - cartItem.quantity;
  const { error } = await supabase.rpc("update_cart_and_decrement_stock", {
    p_cart_id: cartId,
    p_product_id: productId,
    p_new_quantity: newCartItemQuantity,
    p_delta: delta,
  });

  if (error) {
    console.error("Errore transazionale:", error);
    throw new Error("Errore durante l'aggiornamento atomico.");
  }

  revalidatePath("/cart");
  revalidatePath(`/shop/${productId}`);
}

//----------------------------------------------------------- ✅
export async function deleteCartItem(cartId, productId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // ------------------------ ATOMICA ----------------------------------

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

  revalidatePath(`/`);
}

//----------------------------------------------------------- ✅
export async function createOrder(userId, cartId, name, email, totalCost) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

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

//----------------------------------------------------------- ✅
export async function confirmOrder(
  orderId,
  totalCost,
  paymentIntentId,
  paymentIntentClientSecret,
  paymentIntentStatus,
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

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

  redirect(
    `/payment-success?amount=${totalCost}&payment_intent=${paymentIntentId}&payment_intent_client_secret=${paymentIntentClientSecret}&redirect_status=${paymentIntentStatus}`,
    // `/payment-success/amount?=${totalCost}&payment_intent=${paymentIntentId}&payment_intent_client_secret=${paymentIntentClientSecret}&redirect_status=${paymentIntentStatus}`,
  );
}

//----------------------------------------------------------- ✅
export async function simulateOrder(userId, cartId, name, email, totalCost) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase.rpc("simulate_full_order", {
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

  // ✅ Invio email al cliente dopo conferma ordine
  // await resend.emails.send({
  //   from: "Vesugusto <noreply@resend.dev>",
  //   // to: [session.user.email],
  //   to: ["marcodefalco2017@libero.it"],
  //   subject: "Conferma del tuo ordine su Vesugusto",
  //   react: ConfirmedOrderEmail({
  //     username: session.user.name,
  //     items: data.map((item) => ({
  //       id: item.id,
  //       name: item.product.name,
  //       quantity: item.quantity,
  //       price: formatCurrency(item.orderItemPrice),
  //       image: item.product.image,
  //     })),
  //     total: formatCurrency(amount),
  //   }),
  // });
}

//----------------------------------------------------------- ✅
export async function invalidateOrderToken(orderId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

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
