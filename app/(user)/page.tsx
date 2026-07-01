import MainPageHero from "../components/mainHero/mainPageHero";
import RecipeList from "../components/recipes/recipeList";

export default function Home() {
  return (
    <>
      <MainPageHero />
      <main className="max-w-(--max-content-width) mx-auto">
        <RecipeList />
      </main>
    </>
  );
}
