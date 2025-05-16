import { auth } from "@/auth";
import { supabase } from "./supabase";

export async function createUserAndCart(newUser) {
  const { data: userData, error } = await supabase
    .from("users")
    .insert([newUser])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  const userId = userData.id;

  const { data: cartData, error: cartError } = await supabase
    .from("carts")
    .insert([{ userId, created_at: new Date().toISOString() }])
    .select()
    .single();

  if (cartError) {
    console.error(cartError);
    throw new Error("Cart could not be created");
  }

  return {
    user: userData,
    cart: cartData,
  };
}

export async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}

export async function getProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Product could not be loaded");
  }

  return data;
}

export async function getAllProductTypes() {
  const { data, error } = await supabase
    .from("products")
    .select("type", { distinct: true })
    .neq("type", null);

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getAllProductFlavors() {
  const { data, error } = await supabase
    .from("products")
    .select("taste", { distinct: true })
    .neq("type", null);

  if (error) {
    console.error(error);
  }

  return data;
}
