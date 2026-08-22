import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { sql } from "drizzle-orm";

export const recipeDifficultyEnum = pgEnum("recipe_difficulty", [
  "easy",
  "medium",
  "hard",
]);

export const recipeCategoryEnum = pgEnum("recipe_category", [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "side",
  "dessert",
  "drink",
  "soup",
  "salad",
  "sauce",
  "bread",
]);

export const restrictedDietEnum = pgEnum("restricted_diet", [
  "diabetic",
  "gluten-free",
  "halal",
  "hindu",
  "kosher",
  "low-calorie",
  "low-fat",
  "low-lactose",
  "low-salt",
  "vegan",
  "vegetarian",
]);

export const cuisineTable = pgTable("cuisines", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull().unique(),
});

export const recipeTable = pgTable(
  "recipes",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    slug: varchar({ length: 255 }).notNull().unique(),
    imageUrl: text("image_url").notNull(),
    authorId: text("author_id").references(() => user.id, {
      onDelete: "set null",
    }),
    category: recipeCategoryEnum().notNull(),
    cuisineId: uuid("cuisine_id").references(() => cuisineTable.id, {
      onDelete: "set null",
    }),
    description: text(),
    prepTime: integer("prep_time"),
    cookTime: integer("cook_time"),
    difficulty: recipeDifficultyEnum(),
    instructions: text().array().notNull(),
    ingredients: text().array().notNull(),
    servings: integer(),
    diet: restrictedDietEnum().array(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("title_trgm_idx").using("gin", sql`${table.title} gin_trgm_ops`),
    index("description_trgm_idx").using(
      "gin",
      sql`${table.description} gin_trgm_ops`,
    ),
  ],
);

export type RecipeType = typeof recipeTable.$inferSelect;
