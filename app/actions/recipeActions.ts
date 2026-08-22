"use server";

import { db } from "@/db";
import { recipeTable } from "@/db/schemas/recipe-schema";
import { IS_DEV } from "@/utils/helpers";
import { eq, ilike, or, sql } from "drizzle-orm";

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
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
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
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
    return null;
  }
}

export async function getRecipesWithQuery(query: string) {
  const similarity = 0.5;
  const cleanQuery = query.trim();
  if (!cleanQuery) return [];
  const safeIlike = `%${cleanQuery.replace(/[%_]/g, "\\$&")}%`;

  try {
    return await db.query.recipeTable.findMany({
      where: (recipe) =>
        or(
          ilike(recipe.title, safeIlike),
          ilike(recipe.description, safeIlike),
          sql`${recipe.ingredients}::text ILIKE ${safeIlike}`,
          sql`word_similarity(${cleanQuery}, ${recipe.title}) > ${similarity}`,
          sql`word_similarity(${cleanQuery}, ${recipe.description}) > ${similarity}`,
          sql`word_similarity(${cleanQuery}, ${recipe.ingredients}::text) > ${similarity}`,
        ),
      orderBy: (recipe) => [
        sql`GREATEST(
          similarity(${recipe.title}, ${query}),
          similarity(${recipe.description}, ${query})
        ) DESC`,
      ],
      with: {
        author: true,
        cuisine: true,
      },
    });
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
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
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
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
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
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
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
    return null;
  }
}
