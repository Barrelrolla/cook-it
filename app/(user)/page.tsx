import { Suspense } from "react";
import MainPageHero from "../components/hero/mainPageHero";
import RecipeList from "../components/recipes/recipeList";
import RecipeListLoading from "../components/recipes/recipeListLoading";

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
