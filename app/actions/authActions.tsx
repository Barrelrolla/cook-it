"use server";

import { headers } from "next/headers";
import { auth } from "@/auth/auth";
import { IS_DEV } from "@/utils/helpers";
import { cache } from "react";

export const getSession = cache(async () => {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
    return null;
  }
});

export async function setPassword(password: string) {
  try {
    return await auth.api.setPassword({
      body: { newPassword: password },
      headers: await headers(),
    });
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
    return null;
  }
}

export async function getUserAuthMethods() {
  try {
    const accounts = await auth.api.listUserAccounts({
      headers: await headers(),
    });

    const hasPassword = accounts.some(
      (account) => account.providerId === "credential",
    );

    return {
      hasPassword,
      providers: accounts.map((acc) => acc.providerId),
    };
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
    return null;
  }
}

export async function checkUsernameAvailability(username: string) {
  try {
    const { available } = await auth.api.isUsernameAvailable({
      body: { username },
    });
    return available;
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
    return false;
  }
}
