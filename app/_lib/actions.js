"use server";

import { auth, signIn, signOut } from "@/auth";
import comuni from "@/app/_lib/gi_comuni_cap.json";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

export async function googleSignInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function githubSignInAction() {
  await signIn("github", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateUserProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const via = formData.get("via").slice(0, 1000);
  const numeroCivico = formData.get("numeroCivico").slice(0, 1000);
  const comune = formData.get("comune").slice(0, 1000);
  const cap = formData.get("cap").slice(0, 1000);
  const phoneNumber = formData.get("phoneNumber").slice(0, 1000);

  //validazione comune
  if (
    !comuni.find(
      (c) => c.denominazione_ita.toLowerCase() === comune.toLowerCase()
    )
  )
    throw new Error(`${comune} non è un comune valido.`);

  //validazione cap
  if (
    !comuni.find(
      (c) =>
        c.denominazione_ita.toLowerCase() === comune.toLowerCase() &&
        c.cap === cap
    )
  )
    throw new Error(`${cap} non è un cap valido per ${comune}`);

  //validazione numero di telefono
  const regex = /^\+?\d{1,4}?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/;
  if (!regex.test(phoneNumber))
    throw new Error("Please provide a valid phone number");

  console.log(via, numeroCivico, comune, cap, phoneNumber);

  const updatedData = { phoneNumber, via, numeroCivico, comune, cap };

  const { error } = await supabase
    .from("users")
    .update(updatedData)
    .eq("id", session.user.userId);

  if (error) throw new Error("User could not be updated");

  revalidatePath("/account");

  return true;
}

export async function addFavorite(userId, productId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data: existing, error: checkError } = await supabase
    .from("favorites")
    .select("*")
    .eq("userId", userId)
    .eq("productId", productId);

  if (checkError) {
    console.error("Errore durante il controllo:", checkError);
    throw new Error("Errore durante il fetching dei preferiti.");
  }

  if (existing.length > 0) {
    console.log("Già nei preferiti");
    return false;
  }

  const { error: insertError } = await supabase
    .from("favorites")
    .insert([{ userId, productId }])
    .select();

  if (insertError) {
    console.error("Errore durante l'inserimento:", insertError);
    return false;
  }

  revalidatePath("/products");

  return true;
}

export async function deleteFavorite(userId, productId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .eq("userId", userId)
    .eq("productId", productId);

  if (error) {
    console.error(error);
    throw new Error("Favorite product could not be deleted");
  }

  revalidatePath("/account/favorites");
  revalidatePath("/products");
}

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

  // revalidatePath(`/products/${productId}`);
  revalidatePath(`/`);

  return true;
}

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
      checkError
    );
    throw new Error(
      "Errore durante il fetching della quantità del prodotto nel carrello."
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
      productError
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
  revalidatePath(`/products/${productId}`);
}

export async function deleteCartItem(cartId, productId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // ------------------------ ATOMICA ----------------------------------

  const { error } = await supabase.rpc(
    "delete_cart_item_and_increment_quantity",
    {
      p_cart_id: cartId,
      p_product_id: productId,
    }
  );
  if (error) {
    console.error(error);
    throw new Error(error);
  }

  revalidatePath(`/products/${productId}`);

  return true;
}

export async function createOrder(userId, cartId, sessionId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase.rpc("create_full_order", {
    user_id: userId,
    cart_id: cartId,
    session_id: sessionId,
  });

  if (error) {
    console.error("Errore nella creazione ordine atomica", error);
    throw new Error("Errore nella creazione ordine atomica");
  }
}

export async function createRecipe(title, description, userId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("recipes")
    .insert([{ title, description, userId }])
    .select();

  if (error) {
    console.error("Errore nella creazione della ricetta", error);
    throw new Error("Errore nella creazione della ricetta");
  }

  return true;
}
