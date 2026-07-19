"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { user } from "@/db/schemas/auth-schema";

export async function getUserById(id: string) {
  const res = await db.select().from(user).where(eq(user.id, id)).limit(1);
  if (res.length > 0) {
    return res[0];
  } else {
    return null;
  }
}

export async function getUserByUsername(username: string) {
  const res = await db
    .select()
    .from(user)
    .where(eq(user.username, username.toLowerCase()))
    .limit(1);
  if (res.length > 0) {
    return res[0];
  } else {
    return null;
  }
}
