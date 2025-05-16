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
