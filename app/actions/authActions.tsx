"use server";

import { auth } from "@/auth/auth";
import { headers } from "next/headers";

export async function getSession() {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch {
    return null;
  }
}

export async function checkUsernameAvailability(username: string) {
  try {
    const { available } = await auth.api.isUsernameAvailable({
      body: { username },
    });
    return available;
  } catch (error) {
    console.log(error);
    return false;
  }
}
