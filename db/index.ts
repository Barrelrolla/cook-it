import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { recipeTable } from "./schemas";
import slug from "slug";
import { nanoid } from "nanoid";

const db = drizzle(process.env.DATABASE_URL!);

async function getUniqueRecipeSlug(baseSlug: string) {
  return `${slug(baseSlug)}-${nanoid(6)}`;
}

export async function getAllRecipes() {
  return await db.select().from(recipeTable);
}

export async function getRecipeById(id: string) {
  try {
    return (
      (await db.select().from(recipeTable).where(eq(recipeTable.id, id)))[0] ??
      null
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getRecipeBySlug(slug: string) {
  try {
    return (
      (
        await db.select().from(recipeTable).where(eq(recipeTable.slug, slug))
      )[0] ?? null
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function main() {
  await db.insert(recipeTable).values({
    slug: await getUniqueRecipeSlug("Creamy Mushroom Pasta"),
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
    slug: await getUniqueRecipeSlug("Rainbow Buddha Bowl"),
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
    slug: await getUniqueRecipeSlug("Honey Gralic Salmon"),
    title: "Honey Gralic Salmon",
    author: "Julian",
    imageUrl: "/honey-garlic-salmon.png",
    preparationTime: 20,
    difficulty: "medium",
    instructions: "follow those instructions",
    rating: 4.7,
    ratingsCount: 189,
  });
  await db.insert(recipeTable).values({
    slug: await getUniqueRecipeSlug("Chocolate Lava Cake"),
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
