import { Suspense } from "react";
import RecipeList from "@/app/components/recipes/recipeList";
import RecipeListLoading from "@/app/components/recipes/recipeListLoading";

export default function RecipesPage() {
  return (
    <main className="max-w-(--max-content-width) mx-auto mt-26">
      <Suspense fallback={<RecipeListLoading />}>
        <RecipeList />
      </Suspense>
    </main>
  );
}
