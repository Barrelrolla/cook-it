"use server";
import { auth } from "@/auth/auth";
import { authClient } from "@/auth/authClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(
  prevState: { loading: boolean; error: string },
  formData: FormData,
) {
  const name = formData.get("username")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const state = { ...prevState, loading: true, error: "" };

  await authClient.signUp.email(
    {
      email,
      password,
      name,
    },
    {
      onRequest: () => {
        state.loading = true;
      },
      onSuccess: () => {
        state.loading = false;
        redirect("/");
      },
      onError: (ctx) => {
        state.loading = false;
        state.error = ctx.error.message;
      },
    },
  );

  return state;
}

export async function signIn(
  prevState: { loading: boolean; error: string },
  formData: FormData,
) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const state = { ...prevState, loading: true, error: "" };

  await authClient.signIn.email(
    {
      email,
      password,
      rememberMe: true,
    },
    {
      onRequest: () => {
        state.loading = true;
      },
      onSuccess: () => {
        state.loading = false;
        redirect("/");
      },
      onError: (ctx) => {
        state.loading = false;
        state.error = ctx.error.message;
      },
    },
  );
  return state;
}

export async function googleSignIn() {
  await authClient.signIn.social({
    provider: "google",
    disableRedirect: true,
  });
}

export async function signOut() {
  await authClient.signOut();
  redirect("/");
}

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
}
