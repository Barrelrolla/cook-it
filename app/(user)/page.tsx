import { Suspense } from "react";
import RecipeList from "../components/recipes/recipeList";
import RecipeListLoading from "../components/recipes/recipeListLoading";
import MainPageHero from "./mainPageHero";
import { getAllRecipes } from "../actions/recipeActions";

export default function Home() {
  const recipesPromise = getAllRecipes();
  return (
    <>
      <MainPageHero />
      <main>
        <Suspense fallback={<RecipeListLoading />}>
          <RecipeList recipesPromise={recipesPromise} />
        </Suspense>
      </main>
    </>
  );
}
