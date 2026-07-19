"use server";

import { db } from "@/db";
import { user } from "@/db/schemas/auth-schema";
import { eq, sql } from "drizzle-orm";
import { cacheTag, updateTag } from "next/cache";

export async function getUserById(id: string) {
  "use cache";
  cacheTag(`user-${id}`);

  const res = await db.select().from(user).where(eq(user.id, id)).limit(1);
  if (res.length > 0) {
    return res[0];
  } else {
    return null;
  }
}

export async function getUserBySlug(slug: string) {
  "use cache";
  cacheTag(`user-${slug}`);

  const res = await db
    .select()
    .from(user)
    .where(eq(sql`lower(${user.displayName})`, slug.toLowerCase()))
    .limit(1);
  if (res.length > 0) {
    return res[0];
  } else {
    return null;
  }
}

export async function getUserByDisplayName(displayName: string) {
  "use cache";
  cacheTag(`user-${displayName}`);

  const res = await db
    .select()
    .from(user)
    .where(eq(user.displayName, displayName))
    .limit(1);
  if (res.length > 0) {
    return res[0];
  } else {
    return null;
  }
}

export async function checkDisplayNameAvailability(displayName: string) {
  const res = await db
    .select()
    .from(user)
    .where(eq(sql`lower(${user.displayName})`, displayName.toLowerCase()))
    .limit(1);
  if (res.length > 0) {
    return false;
  }
  return true;
}

export async function setUserDisplayName(displayName: string, userId: string) {
  updateTag(`user-${displayName}`);

  await db
    .update(user)
    .set({ displayName: displayName })
    .where(eq(user.id, userId));
}
