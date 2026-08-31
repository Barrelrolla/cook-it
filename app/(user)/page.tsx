import { Suspense } from "react";
import RecipeList from "../components/recipes/recipeList";
import RecipeListLoading from "../components/recipes/recipeListLoading";
import MainPageHero from "./mainPageHero";
import { getAllRecipes } from "../actions/recipeActions";
import SearchButton from "../components/searchButton";

export default function Home() {
  const recipeCount = 8;
  const recipesPromise = getAllRecipes(recipeCount, 0);
  return (
    <>
      <MainPageHero />
      <main>
        <div className="px-2 w-full">
          <SearchButton />
        </div>
        <Suspense fallback={<RecipeListLoading />}>
          <RecipeList recipesPromise={recipesPromise} />
        </Suspense>
      </main>
    </>
  );
}
