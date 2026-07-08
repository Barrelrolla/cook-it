"use server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { recipeTable } from "@/db/schemas/recipeSchema";

export async function getAllRecipes() {
  try {
    return await db.select().from(recipeTable);
  } catch (error) {
    throw new Error(
      `Failed to retrieve recipes. ${error instanceof Error ? error.message : String(error)}`,
    );
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
    throw new Error(
      `Failed to get recipe with id: ${id}. ${error instanceof Error ? error.message : String(error)}`,
    );
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
    throw new Error(
      `Failed to get recipe with slug ${slug}. ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
