import {
  getRecipesByUserId,
  getRecipesSavedByUser,
} from "@/app/actions/recipeActions";
import RecipeList from "@/app/components/recipes/recipeList";
import { getPaginationParams } from "@/utils/helpers";

export default function UserRecipes({
  userId,
  saved,
  page,
}: {
  userId: string;
  saved?: string;
  page?: string | undefined;
}) {
  const pageSize = 8;
  const { offset } = getPaginationParams(pageSize, page);
  const recipesPromise =
    saved !== undefined
      ? getRecipesSavedByUser(pageSize, offset)
      : getRecipesByUserId(userId, pageSize, offset);

  return (
    <RecipeList
      recipesPromise={recipesPromise}
      showPagination
      pageSize={pageSize}
    />
  );
}
