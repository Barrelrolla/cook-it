import {
  boolean,
  decimal,
  integer,
  pgEnum,
  pgTable,
  time,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const recipeDifficultyEnum = pgEnum("recipeDifficulty", [
  "easy",
  "medium",
  "hard",
]);

export const recipeTable = pgTable("recipes", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  imageUrl: varchar("image_url").notNull(),
  author: varchar().notNull(),
  instructions: varchar().notNull(),
  preparationTime: integer("preparation_time").notNull(),
  difficulty: recipeDifficultyEnum().notNull(),
  isLiked: boolean("is_liked").notNull().default(false),
  rating: decimal({ mode: "number" }).notNull().default(0.0),
  ratingsCount: integer("ratings_count").notNull().default(0),
  createdAt: time("created_at").notNull().defaultNow(),
  updatedAt: time("updated_at").notNull().defaultNow(),
});

export type RecipeType = typeof recipeTable.$inferSelect;
