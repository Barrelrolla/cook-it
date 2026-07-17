"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { recipeTable } from "@/db/schemas/recipeSchema";

export async function getAllRecipes() {
  try {
    return await db.select().from(recipeTable);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getRecipeById(id: string) {
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
