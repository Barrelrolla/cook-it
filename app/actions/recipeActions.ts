"use server";

import { db } from "@/db";

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
    const recipe = await db.query.recipeTable.findFirst({
      where: (recipe, { eq }) => eq(recipe.id, id),
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

export async function getRecipeBySlug(slug: string) {
  try {
    const recipe = await db.query.recipeTable.findFirst({
      where: (recipe, { eq }) => eq(recipe.slug, slug),
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
