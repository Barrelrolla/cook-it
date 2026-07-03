import { Suspense } from "react";
import RecipeList from "../components/recipes/recipeList";
import RecipeListLoading from "../components/recipes/recipeListLoading";
import MainPageHero from "../components/hero/mainPageHero";

export default function Home() {
  return (
    <>
      <MainPageHero />
      <main>
        <Suspense fallback={<RecipeListLoading />}>
          <RecipeList />
        </Suspense>
      </main>
    </>
  );
}
