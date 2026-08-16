import {
  recipeCategoryEnum,
  recipeDifficultyEnum,
  restrictedDietEnum,
} from "@/db/schemas/recipe-schema";
import { getTranslations } from "next-intl/server";

export type RecipeCategory = (typeof recipeCategoryEnum.enumValues)[number];
export type RecipeDifficulty = (typeof recipeDifficultyEnum.enumValues)[number];
export type RestrictedDiet = (typeof restrictedDietEnum.enumValues)[number];

export async function formatCategory(
  category: RecipeCategory,
): Promise<string> {
  const t = await getTranslations("Recipes.Categories");
  return t(category) ?? category;
}

export async function formatDifficulty(
  difficulty: RecipeDifficulty,
): Promise<string> {
  const t = await getTranslations("Recipes.Difficulty");
  return t(difficulty) ?? difficulty;
}

export async function formatDiet(diet: RestrictedDiet): Promise<string> {
  const t = await getTranslations("Recipes.Diet");
  return t(diet) ?? diet;
}
