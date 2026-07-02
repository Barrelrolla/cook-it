import RecipeList from "@/app/components/recipes/recipeList";
import RecipeListLoading from "@/app/components/recipes/recipeListLoading";
import { Suspense } from "react";

export default function RecipesPage() {
  return (
    <div className="max-w-(--max-content-width) mx-auto mt-26">
      <Suspense fallback={<RecipeListLoading />}>
        <RecipeList />
      </Suspense>
    </div>
  );
}
