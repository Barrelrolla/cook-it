import slug from "slug";
import { nanoid } from "nanoid";

export const IS_DEV = process.env.NODE_ENV === "development";
export const IS_PROD = process.env.NODE_ENV === "production";

export function getUniqueRecipeSlug(baseSlug: string) {
  return `${slug(baseSlug)}-${nanoid(6)}`;
}
