import slug from "slug";
import { nanoid } from "nanoid";

export function getUniqueRecipeSlug(baseSlug: string) {
  return `${slug(baseSlug)}-${nanoid(6)}`;
}
