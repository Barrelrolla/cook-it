"use server";

import { db } from ".";
import { recipeTable } from "./schemas/recipeSchema";
import { getUniqueRecipeSlug } from "@/utils/helpers";

export async function populate() {
  await db.insert(recipeTable).values({
    slug: getUniqueRecipeSlug("Creamy Mushroom Pasta"),
    title: "Creamy Mushroom Pasta",
    author: "Julian",
    imageUrl: "/creamy-mushroom-pasta.png",
    preparationTime: 30,
    difficulty: "easy",
    instructions: "follow those instructions",
    rating: 4.8,
    ratingsCount: 324,
  });
  await db.insert(recipeTable).values({
    slug: getUniqueRecipeSlug("Rainbow Buddha Bowl"),
    title: "Rainbow Buddha Bowl",
    author: "Julian",
    imageUrl: "/rainbow-buddha-bowl.png",
    preparationTime: 25,
    difficulty: "easy",
    instructions: "follow those instructions",
    rating: 49,
    ratingsCount: 256,
  });
  await db.insert(recipeTable).values({
    slug: getUniqueRecipeSlug("Honey Garlic Salmon"),
    title: "Honey Garlic Salmon",
    author: "Julian",
    imageUrl: "/honey-garlic-salmon.png",
    preparationTime: 20,
    difficulty: "medium",
    instructions: "follow those instructions",
    rating: 4.7,
    ratingsCount: 189,
  });
  await db.insert(recipeTable).values({
    slug: getUniqueRecipeSlug("Chocolate Lava Cake"),
    title: "Chocolate Lava Cake",
    author: "Julian",
    imageUrl: "/chocolate-lava-cake.png",
    preparationTime: 40,
    difficulty: "hard",
    instructions: "follow those instructions",
    rating: 4.9,
    ratingsCount: 312,
  });
}
