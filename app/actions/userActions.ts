import { db } from "@/db";
import { user } from "@/db/schemas/auth-schema";
import { eq } from "drizzle-orm";

export async function getUserById(id: string) {
  const res = await db.select().from(user).where(eq(user.id, id)).limit(1);
  if (res.length > 0) {
    return res[0];
  } else {
    return null;
  }
}

export async function getUserByName(name: string) {
  const res = await db.select().from(user).where(eq(user.name, name)).limit(1);
  if (res.length > 0) {
    return res[0];
  } else {
    return null;
  }
}
