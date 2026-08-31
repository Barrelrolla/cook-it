"use server";

import { db } from "@/db";
import {
  likesTable,
  recipeCategoryEnum,
  recipeDifficultyEnum,
  recipeTable,
  restrictedDietEnum,
  savedTable,
} from "@/db/schemas/recipe-schema";
import { getCloudinaryPublicId, IS_DEV } from "@/utils/helpers";
import { and, arrayContains, desc, eq, ilike, or, sql } from "drizzle-orm";
import { getSession } from "./authActions";
import { revalidatePath } from "next/cache";
import { createRecipeValidation } from "@/utils/validationSchemas";
import { getTranslations } from "next-intl/server";
import { deleteImage } from "./imageActions";

export type RecipeWithRelations = NonNullable<
  Awaited<ReturnType<typeof getAllRecipes>>
>["recipes"][number];

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

    const recipe = await getRecipeById(recipeId);
    if (!recipe) return;

    await db.delete(recipeTable).where(eq(recipeTable.id, recipeId));
    if (recipe.imageUrl) {
      try {
        const publicId = getCloudinaryPublicId(recipe.imageUrl);
        if (publicId) {
          await deleteImage(publicId);
        }
      } catch (err) {
        if (IS_DEV) {
          console.error(err);
        }
      }
    }
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

export async function getAllRecipes(limit: number, offset: number) {
  try {
    const [recipes, [{ count }]] = await Promise.all([
      db.query.recipeTable.findMany({
        limit,
        offset,
        orderBy: (recipe, { desc }) => [
          desc(recipe.createdAt),
          desc(recipe.id),
        ],
        with: {
          author: true,
          cuisine: true,
        },
      }),
      db.select({ count: sql<number>`count(*)` }).from(recipeTable),
    ]);
    return { recipes, count };
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return null;
}

export async function getRecipesByCategory(
  category: (typeof recipeCategoryEnum.enumValues)[number],
  limit: number,
  offset: number,
) {
  try {
    const condition = eq(recipeTable.category, category);
    const [recipes, [{ count }]] = await Promise.all([
      db.query.recipeTable.findMany({
        where: condition,
        limit,
        offset,
        orderBy: (recipe, { desc }) => [
          desc(recipe.createdAt),
          desc(recipe.id),
        ],
        with: {
          author: true,
          cuisine: true,
        },
      }),
      db
        .select({ count: sql<number>`count(*)` })
        .from(recipeTable)
        .where(condition),
    ]);
    return { recipes, count };
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return null;
}

export async function getRecipesWithQuery(
  params: {
    query?: string;
    category?: (typeof recipeCategoryEnum.enumValues)[number];
    difficulty?: (typeof recipeDifficultyEnum.enumValues)[number];
    cuisine?: string | undefined;
    diet?: (typeof restrictedDietEnum.enumValues)[number][];
  },
  limit: number,
  offset: number,
) {
  try {
    const { query, category, difficulty, cuisine, diet } = params;
    const cleanQuery = query?.trim();

    const searchCondition = cleanQuery
      ? (() => {
          const similarity = 0.5;
          const safeIlike = `%${cleanQuery.replace(/[%_]/g, "\\$&")}%`;

          return or(
            ilike(recipeTable.title, safeIlike),
            ilike(recipeTable.description, safeIlike),
            sql`${recipeTable.ingredients}::text ILIKE ${safeIlike}`,
            sql`word_similarity(${cleanQuery}, ${recipeTable.title}) > ${similarity}`,
            sql`word_similarity(${cleanQuery}, ${recipeTable.description}) > ${similarity}`,
            sql`word_similarity(${cleanQuery}, ${recipeTable.ingredients}::text) > ${similarity}`,
          );
        })()
      : undefined;

    const condition = and(
      category ? eq(recipeTable.category, category) : undefined,
      difficulty ? eq(recipeTable.difficulty, difficulty) : undefined,
      cuisine ? eq(recipeTable.cuisineId, cuisine) : undefined,
      diet?.length ? arrayContains(recipeTable.diet, diet) : undefined,
      diet?.length ? arrayContains(recipeTable.diet, diet) : undefined,
      searchCondition,
    );

    const [recipes, [{ count }]] = await Promise.all([
      db.query.recipeTable.findMany({
        where: condition,
        limit,
        offset,
        orderBy: cleanQuery
          ? (recipe) => [
              sql`GREATEST(
        word_similarity(${recipe.title}, ${cleanQuery}),
        word_similarity(${recipe.description}, ${cleanQuery}),
        word_similarity(${recipe.ingredients}::text, ${cleanQuery})
      ) DESC`,
            ]
          : desc(recipeTable.createdAt),
        with: {
          author: true,
          cuisine: true,
        },
      }),
      db
        .select({ count: sql<number>`count(*)` })
        .from(recipeTable)
        .where(condition),
    ]);
    return { recipes, count };
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

export async function getRecipesByUserId(
  userId: string,
  limit: number,
  offset: number,
) {
  try {
    const condition = eq(recipeTable.authorId, userId);
    const [recipes, [{ count }]] = await Promise.all([
      db.query.recipeTable.findMany({
        limit,
        offset,
        where: condition,
        orderBy: (recipe, { desc }) => [
          desc(recipe.createdAt),
          desc(recipe.id),
        ],
        with: {
          author: true,
          cuisine: true,
        },
      }),
      db
        .select({ count: sql<number>`count(*)` })
        .from(recipeTable)
        .where(condition),
    ]);
    return { recipes, count };
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return null;
}

export async function getRecipesSavedByUser(limit: number, offset: number) {
  try {
    const session = await getSession();
    if (!session) return null;

    const condition = eq(savedTable.userId, session.user.id);

    const [saved, [{ count }]] = await Promise.all([
      db.query.savedTable.findMany({
        where: condition,
        limit,
        offset,
        orderBy: (save, { desc }) => [desc(save.createdAt), desc(save.id)],
        with: {
          recipe: {
            with: {
              author: true,
              cuisine: true,
            },
          },
        },
      }),
      db
        .select({ count: sql<number>`count(*)` })
        .from(savedTable)
        .where(condition),
    ]);

    return { recipes: saved.map(({ recipe }) => recipe), count };
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
  }

  return null;
}
