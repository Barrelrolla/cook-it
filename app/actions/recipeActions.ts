"use server";

import { db } from "@/db";
import { recipeTable } from "@/db/schemas/recipe-schema";
import { eq } from "drizzle-orm";

export type RecipeWithRelations = NonNullable<
  Awaited<ReturnType<typeof getAllRecipes>>
>[number];

export type RecipeWithRelationsPromise = NonNullable<
  ReturnType<typeof getAllRecipes>
>;

export async function addRecipe(recipe: typeof recipeTable.$inferInsert) {
  try {
    const inserted = await db.insert(recipeTable).values(recipe);
    return JSON.parse(JSON.stringify(inserted));
  } catch {
    return null;
  }
}

export async function deleteRecipe(recipeId: string) {
  await db.delete(recipeTable).where(eq(recipeTable.id, recipeId));
}

export async function getAllRecipes() {
  try {
    return await db.query.recipeTable.findMany({
      with: {
        author: true,
        cuisine: true,
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

export async function getRecipesByUserId(userid: string) {
  try {
    return await db.query.recipeTable.findMany({
      where: (recipe, { eq }) => eq(recipe.authorId, userid),
      with: {
        author: true,
        cuisine: true,
      },
    });
  } catch {
    return null;
  }
}
