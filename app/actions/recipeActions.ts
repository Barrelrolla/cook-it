"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { recipeTable } from "@/db/schemas/recipe-schema";

export type RecipeWithRelations = NonNullable<
  Awaited<ReturnType<typeof getAllRecipes>>
>[number];

export async function getAllRecipes() {
  try {
    return await db.query.recipeTable.findMany({
      with: {
        author: true,
      },
    });
  } catch {
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
  } catch {
    return null;
  }
}

export async function getRecipeBySlug(slug: string) {
  try {
    const recipe = await db.query.recipeTable.findFirst({
      where: (recipes, { eq }) => eq(recipes.slug, slug),
      with: {
        author: true,
        cuisine: true,
      },
    });

    return recipe ?? null;
  } catch {
    return null;
  }
}
