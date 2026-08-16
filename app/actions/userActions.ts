"use server";

import { db } from "@/db";

export async function getUserById(id: string) {
  try {
    return db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
  } catch {
    return null;
  }
}

export async function getUserByUsername(username: string) {
  const lower = username.toLowerCase();
  try {
    return db.query.user.findFirst({
      where: (user, { eq }) => eq(user.username, lower),
    });
  } catch {
    return null;
  }
}
