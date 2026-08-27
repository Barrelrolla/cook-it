"use server";

import { db } from "@/db";
import {
  likesTable,
  recipeCategoryEnum,
  recipeTable,
} from "@/db/schemas/recipe-schema";
import { IS_DEV } from "@/utils/helpers";
import { and, eq, ilike, or, sql } from "drizzle-orm";
import { getSession } from "./authActions";
import { revalidatePath } from "next/cache";
import { createRecipeValidation } from "@/utils/validationSchemas";
import { getTranslations } from "next-intl/server";

export type RecipeWithRelations = NonNullable<
  Awaited<ReturnType<typeof getAllRecipes>>
>[number];

export type RecipeWithRelationsPromise = NonNullable<
  ReturnType<typeof getAllRecipes>
>;

type RecipeUpdate = Partial<
  Omit<
    typeof recipeTable.$inferInsert,
    "id" | "authorId" | "likesCount" | "createdAt"
  >
>;

export async function addRecipe(recipe: typeof recipeTable.$inferInsert) {
  try {
    const session = await getSession();
    if (!session) {
      return null;
    }
    const t = await getTranslations("Validation");
    const {
      title,
      description,
      category,
      cuisineId,
      difficulty,
      prepTime,
      cookTime,
      servings,
      diet,
      ingredients,
      instructions,
    } = recipe;
    const verified = createRecipeValidation(t).safeParse({
      title,
      description,
      category,
      cuisineId,
      difficulty,
      prepTime,
      cookTime,
      servings,
      diet,
      ingredients,
      instructions,
    });
    if (!verified.success) {
      return null;
    }
    const inserted = await db
      .insert(recipeTable)
      .values({
        ...verified.data,
        slug: recipe.slug,
        imageUrl: recipe.imageUrl,
        authorId: session.user.id,
      })
      .returning();
    return JSON.parse(JSON.stringify(inserted));
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return null;
}

export async function updateRecipe(recipeId: string, recipe: RecipeUpdate) {
  try {
    const session = await getSession();
    if (!session) {
      return null;
    }
    const t = await getTranslations("Validation");
    const {
      title,
      description,
      category,
      cuisineId,
      difficulty,
      prepTime,
      cookTime,
      servings,
      diet,
      ingredients,
      instructions,
    } = recipe;
    const verified = createRecipeValidation(t).safeParse({
      title,
      description,
      category,
      cuisineId,
      difficulty,
      prepTime,
      cookTime,
      servings,
      diet,
      ingredients,
      instructions,
    });
    if (!verified.success) {
      return null;
    }
    await db
      .update(recipeTable)
      .set({ ...verified.data, imageUrl: recipe.imageUrl })
      .where(
        and(
          eq(recipeTable.id, recipeId),
          eq(recipeTable.authorId, session.user.id),
        ),
      );
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return null;
}

export async function deleteRecipe(recipeId: string) {
  try {
    const session = await getSession();
    if (!session) return;

    await db.delete(recipeTable).where(eq(recipeTable.id, recipeId));
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }
}

export async function getIsLiked(recipeId: string) {
  try {
    const session = await getSession();
    if (!session) return false;

    const liked = await db.query.likesTable.findFirst({
      where: (like, { and, eq }) =>
        and(eq(like.recipeId, recipeId), eq(like.userId, session.user.id)),
    });
    if (liked) {
      return true;
    }
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return false;
}

export async function likeRecipe(recipeId: string, slug: string) {
  try {
    const session = await getSession();
    if (!session) return;

    await db.transaction(async (tx) => {
      const inserted = await tx
        .insert(likesTable)
        .values({
          recipeId,
          userId: session.user.id,
        })
        .onConflictDoNothing()
        .returning({ id: likesTable.id });

      if (inserted.length > 0) {
        await tx
          .update(recipeTable)
          .set({
            likesCount: sql`${recipeTable.likesCount} + 1`,
          })
          .where(eq(recipeTable.id, recipeId));
      }
    });
    revalidatePath(`/recipes/${slug}`);
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }
}

export async function unlikeRecipe(recipeId: string, slug: string) {
  try {
    const session = await getSession();
    if (!session) return;

    await db.transaction(async (tx) => {
      const deleted = await tx
        .delete(likesTable)
        .where(
          and(
            eq(likesTable.recipeId, recipeId),
            eq(likesTable.userId, session.user.id),
          ),
        )
        .returning({ id: likesTable.id });

      if (deleted.length > 0) {
        await tx
          .update(recipeTable)
          .set({
            likesCount: sql`GREATEST(${recipeTable.likesCount} - 1, 0)`,
          })
          .where(eq(recipeTable.id, recipeId));
      }
    });
    revalidatePath(`/recipes/${slug}`);
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }
}

export async function getAllRecipes() {
  try {
    return await db.query.recipeTable.findMany({
      orderBy: (recipe, { desc }) => desc(recipe.createdAt),
      with: {
        author: true,
        cuisine: true,
      },
    });
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return null;
}

export async function getRecipesByCategory(
  category: (typeof recipeCategoryEnum.enumValues)[number],
) {
  try {
    return await db.query.recipeTable.findMany({
      where: (recipe, { eq }) => eq(recipe.category, category),
      with: {
        author: true,
        cuisine: true,
      },
    });
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return null;
}

export async function getRecipesWithQuery(query: string) {
  try {
    const similarity = 0.5;
    const cleanQuery = query.trim();
    if (!cleanQuery) return [];
    const safeIlike = `%${cleanQuery.replace(/[%_]/g, "\\$&")}%`;

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
          word_similarity(${recipe.title}, ${query}),
          word_similarity(${recipe.description}, ${query})
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
  }

  return null;
}

export async function getRecipeById(id: string) {
  try {
    return await db.query.recipeTable.findFirst({
      where: (recipe, { eq }) => eq(recipe.id, id),
      with: {
        author: true,
        cuisine: true,
      },
    });
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return null;
}

export async function getRecipeBySlug(slug: string) {
  try {
    return await db.query.recipeTable.findFirst({
      where: (recipe, { eq }) => eq(recipe.slug, slug),
      with: {
        author: true,
        cuisine: true,
      },
    });
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return null;
}

export async function getRecipesByUserId(userId: string) {
  try {
    return await db.query.recipeTable.findMany({
      where: (recipe, { eq }) => eq(recipe.authorId, userId),
      orderBy: (recipe, { desc }) => desc(recipe.createdAt),
      with: {
        author: true,
        cuisine: true,
      },
    });
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return null;
}

export async function getRecipesSavedByUser() {
  try {
    const session = await getSession();
    if (!session) return null;

    const saved = await db.query.savedTable.findMany({
      where: (save, { eq }) => eq(save.userId, session.user.id),
      orderBy: (save, { desc }) => desc(save.createdAt),
      with: {
        recipe: {
          with: {
            author: true,
            cuisine: true,
          },
        },
      },
    });
    return saved.map(({ recipe }) => recipe);
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return null;
}
