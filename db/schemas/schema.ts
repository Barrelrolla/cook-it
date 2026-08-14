import * as authSchema from "./auth-schema";
import * as recipeSchema from "./recipe-schema";
import * as relations from "./relations";

export const schema = {
  ...authSchema,
  ...recipeSchema,
  ...relations,
};
