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
  const { data: existing, error: checkError } = await supabase
    .from("favorites")
    .select("*")
    .eq("userId", userId)
    .eq("productId", productId);

  if (checkError) {
    console.error("Errore durante il controllo:", checkError);
    throw new Error("Errore durante il fetchin dei preferiti.");
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
  const { data: availability, error: availabilityError } = await supabase
    .from("products")
    .select("quantity")
    .eq("id", productId);

  if (availabilityError) {
    console.error(
      "Errore durante il fetching della disponibilità del prodotto:",
      availabilityError
    );
    throw new Error(
      "Errore durante il fetching della disponibilità del prodotto."
    );
  }

  if (availability.quantity === 0) throw new Error("Prodotto esaurito");

  const { data: existing, error: checkError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cartId", cartId)
    .eq("productId", productId);

  if (checkError) {
    console.error("Errore durante il controllo:", checkError);
    throw new Error("Errore durante il fetching del prodotto nel carrello.");
  }

  if (existing.length > 0) {
    console.log("Già nei carrello");
    const { error: incrementError } = await supabase.rpc("increment_quantity", {
      p_cart_id: cartId, // il tuo userId (int)
      p_product_id: productId, // il tuo productId (int)
      p_amount: quantity, // quanto vuoi incrementare
    });

    if (incrementError) {
      console.error("Errore RPC:", incrementError);
      throw new Error("Errore durante l'incremento nel carrello.");
    }

    const { error: decrementError } = await supabase.rpc("decrement_quantity", {
      p_product_id: productId,
      p_amount: quantity,
    });

    if (decrementError) {
      console.error("Errore RPC:", decrementError);
      throw new Error("Errore durante il decremento nel prodotto.");
    }

    revalidatePath(`/products/${productId}`);

    return true;
  }

  const { data, error: insertError } = await supabase
    .from("cart_items")
    .insert([{ cartId, productId, quantity }])
    .select();

  if (insertError) {
    console.error("Errore durante l'inserimento nel carrello:", insertError);
    throw new Error("Errore durante l'inserimento nel carrello.");
  }

  const { error } = await supabase.rpc("decrement_quantity", {
    p_product_id: productId,
    p_amount: quantity,
  });

  if (error) {
    console.error("Errore RPC:", error);
    throw new Error("Errore durante il decremento nel prodotto.");
  }

  revalidatePath(`/products/${productId}`);

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
    console.error("Scorte esaurite");
    throw new Error("Scorte esaurite.");
  }

  const { error: updateError } = await supabase
    .from("cart_items")
    .update({ quantity: newCartItemQuantity })
    .eq("cartId", cartId)
    .eq("productId", productId)
    .select();

  if (updateError) {
    console.error(
      "Errore durante l'aggiornamento della quantità del prodotto nel carrello:",
      updateError
    );
    throw new Error(
      "Errore durante l'aggiornamento della quantità del prodotto nel carrello."
    );
  }

  const delta = newCartItemQuantity - cartItem.quantity;
  const { error } = await supabase.rpc("decrement_product_quantity", {
    p_product_id: productId,
    p_delta: delta,
  });

  if (error) {
    console.error("Errore RPC:", error);
    throw new Error(
      "Errore durante il decremento della quantità nel prodotto."
    );
  }

  revalidatePath("/cart");
  revalidatePath(`/products/${productId}`);
}

export async function deleteCartItem(cartId, productId) {
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

  // const { data: cartItem, error: cartItemError } = await supabase
  //   .from("cart_items")
  //   .select("quantity")
  //   .eq("cartId", cartId)
  //   .eq("productId", productId)
  //   .single();

  // if (cartItemError) {
  //   console.error(
  //     "Errore durante il fetch della quantità nel carrello:",
  //     cartItemError
  //   );
  //   throw new Error("Impossibile recuperare la quantità dal carrello.");
  // }

  // const cartQuantity = cartItem.quantity;
  // const { error } = await supabase.rpc("increment_product_quantity", {
  //   p_product_id: productId,
  //   p_amount: cartQuantity,
  // });

  // if (error) {
  //   console.error("Errore RPC:", error);
  //   throw new Error("Errore durante l'incremento della quantità nel prodotto.");
  // }

  // const { error: deleteError } = await supabase
  //   .from("cart_items")
  //   .delete()
  //   .eq("cartId", cartId)
  //   .eq("productId", productId);

  // if (deleteError) {
  //   console.error(
  //     "Errore durante la cancellazione del prodotto nel carrello:",
  //     deleteError
  //   );
  //   throw new Error(
  //     "Errore durante la cancellazione del prodotto nel carrello."
  //   );
  // }
}
