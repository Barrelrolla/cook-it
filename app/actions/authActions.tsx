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
