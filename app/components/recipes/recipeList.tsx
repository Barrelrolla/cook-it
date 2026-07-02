import RecipeItem from "./recipeItem";
import { getAllRecipes } from "@/db";

export default async function RecipeList() {
  const recipes = await getAllRecipes();
  return (
    <div className="m-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {recipes.map((recipe) => {
          return <RecipeItem key={recipe.id} recipe={recipe} />;
        })}
      </ul>
    </div>
  );
}
