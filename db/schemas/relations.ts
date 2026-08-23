import { relations } from "drizzle-orm";
import { cuisineTable, recipeTable, savedTable } from "./recipe-schema";
import { user } from "./auth-schema";

export const recipeRelations = relations(recipeTable, ({ one }) => ({
  author: one(user, {
    fields: [recipeTable.authorId],
    references: [user.id],
  }),

  cuisine: one(cuisineTable, {
    fields: [recipeTable.cuisineId],
    references: [cuisineTable.id],
  }),
}));

export const savedRelations = relations(savedTable, ({ one }) => ({
  user: one(user, {
    fields: [savedTable.userId],
    references: [user.id],
  }),
  recipe: one(recipeTable, {
    fields: [savedTable.recipeId],
    references: [recipeTable.id],
  }),
}));
