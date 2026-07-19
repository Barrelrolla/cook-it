"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { recipeTable } from "@/db/schemas/recipeSchema";
import { cacheTag } from "next/cache";

export async function getAllRecipes() {
  "use cache";
  cacheTag("recipes");

  try {
    return await db.select().from(recipeTable);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getRecipeById(id: string) {
  "use cache";
  cacheTag(`recipe-${id}`);

  try {
    const res = await db
      .select()
      .from(recipeTable)
      .where(eq(recipeTable.id, id))
      .limit(1);
    if (res.length > 0) {
      return res[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getRecipeBySlug(slug: string) {
  "use cache";
  cacheTag(`recipe-${slug}`);

  try {
    const res = await db
      .select()
      .from(recipeTable)
      .where(eq(recipeTable.slug, slug))
      .limit(1);
    if (res.length > 0) {
      return res[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
