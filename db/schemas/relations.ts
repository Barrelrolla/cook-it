import { relations } from "drizzle-orm";
import { cuisineTable, recipeTable } from "./recipe-schema";
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
