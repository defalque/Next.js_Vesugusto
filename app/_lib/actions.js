"use server";

import { signIn, signOut } from "@/auth";

export async function googleSignInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function githubSignInAction() {
  await signIn("github", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
