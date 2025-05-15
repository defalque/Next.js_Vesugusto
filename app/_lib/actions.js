"use server";

import { auth, signIn, signOut } from "@/auth";
import { z } from "zod";

const schema = z.object({
  address: z.string({
    invalid_type_error: "Invalid address",
  }),
});

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

  const via = formData.get("via");
  const numeroCivico = formData.get("numeroCivico");
  const comune = formData.get("comune");
  const cap = formData.get("cap");
  const phoneNumber = formData.get("phoneNumber");

  //valida campi

  console.log(via, numeroCivico, comune, cap, phoneNumber);

  const regex = /^\+?\d{1,4}?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}$/;
  if (!regex.test(phoneNumber))
    throw new Error("Please provide a valid phone number");
}
