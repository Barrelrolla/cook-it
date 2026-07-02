import { Suspense } from "react";
import MainPageHero from "../components/mainHero/mainPageHero";
import RecipeList from "../components/recipes/recipeList";
import RecipeListLoading from "../components/recipes/recipeListLoading";

export default function Home() {
  return (
    <>
      <MainPageHero />
      <section className="max-w-(--max-content-width) mx-auto">
        <Suspense fallback={<RecipeListLoading />}>
          <RecipeList />
        </Suspense>
      </section>
    </>
  );
}
