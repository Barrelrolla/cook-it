"use server";

import { db } from "@/db";
import { savedTable } from "@/db/schemas/recipe-schema";
import { IS_DEV } from "@/utils/helpers";
import { getSession } from "./authActions";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getUserById = cache(async (id: string) => {
  try {
    return await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return null;
});

export const getUserByUsername = cache(async (username: string) => {
  const lower = username.toLowerCase();
  try {
    return await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.username, lower),
    });
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return null;
});

export async function saveRecipe(recipeId: string, slug: string) {
  try {
    const session = await getSession();
    if (!session) return;

    await db
      .insert(savedTable)
      .values({ recipeId, userId: session.user.id })
      .onConflictDoNothing();

    revalidatePath(`/recipes/${slug}`);
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }
}

export async function unsaveRecipe(recipeId: string, slug: string) {
  try {
    const session = await getSession();
    if (!session) return;

    await db
      .delete(savedTable)
      .where(
        and(
          eq(savedTable.userId, session.user.id),
          eq(savedTable.recipeId, recipeId),
        ),
      );

    revalidatePath(`/recipes/${slug}`);
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }
}

export async function getIsSaved(recipeId: string) {
  try {
    const session = await getSession();
    if (!session) return false;

    const saved = await db.query.savedTable.findFirst({
      where: (save, { and, eq }) =>
        and(eq(save.recipeId, recipeId), eq(save.userId, session.user.id)),
    });
    if (saved) {
      return true;
    }
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return false;
}
