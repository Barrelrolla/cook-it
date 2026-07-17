import { db } from "@/db";
import { user } from "@/db/schemas/auth-schema";
import { eq, sql } from "drizzle-orm";

export async function getUserById(id: string) {
  const res = await db.select().from(user).where(eq(user.id, id)).limit(1);
  if (res.length > 0) {
    return res[0];
  } else {
    return null;
  }
}

export async function getUserBySlug(slug: string) {
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
  await db
    .update(user)
    .set({ displayName: displayName })
    .where(eq(user.id, userId));
}
