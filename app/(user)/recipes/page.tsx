import { Suspense } from "react";
import RecipeList from "@/app/components/recipes/recipeList";
import RecipeListLoading from "@/app/components/recipes/recipeListLoading";
import { getAllRecipes } from "@/app/actions/recipeActions";

export default function RecipesPage() {
  const recipesPromise = getAllRecipes();
  return (
    <main className="max-w-(--max-content-width) mx-auto mt-26">
      <Suspense fallback={<RecipeListLoading />}>
        <RecipeList recipesPromise={recipesPromise} />
      </Suspense>
    </main>
  );
}
