"use server";

import { db } from "@/db";
import { IS_DEV } from "@/utils/helpers";

export async function getUserById(id: string) {
  try {
    return db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
    return null;
  }
}

export async function getUserByUsername(username: string) {
  const lower = username.toLowerCase();
  try {
    return db.query.user.findFirst({
      where: (user, { eq }) => eq(user.username, lower),
    });
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
    return null;
  }
}
