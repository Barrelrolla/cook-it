import {
  getRecipesByUserId,
  getRecipesSavedByUser,
} from "@/app/actions/recipeActions";
import RecipeList from "@/app/components/recipes/recipeList";

export default function UserRecipes({
  userId,
  saved,
}: {
  userId: string;
  saved?: string;
}) {
  const recipesPromise =
    saved !== undefined ? getRecipesSavedByUser() : getRecipesByUserId(userId);

  return <RecipeList recipesPromise={recipesPromise} />;
}
