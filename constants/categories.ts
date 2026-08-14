import { recipeCategoryEnum } from "@/db/schemas/recipe-schema";

export type RecipeCategory = (typeof recipeCategoryEnum.enumValues)[number];

export const CATEGORY_LABELS: Record<RecipeCategory, string> = {
  breakfast: "Breakfast & Brunch",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snacks & Appetizers",
  side: "Sides & Accompaniments",
  dessert: "Desserts & Sweets",
  drink: "Beverages & Cocktails",
  soup: "Soups & Stews",
  salad: "Salads",
  sauce: "Sauces & Condiments",
  bread: "Breads & Baking",
};

export function formatCategory(
  category: RecipeCategory | string | null | undefined,
): string {
  if (!category) return "Uncategorized";
  return CATEGORY_LABELS[category as RecipeCategory] ?? category;
}
