import { getAllRecipes } from "@/app/actions/recipeActions";
import RecipeItem from "./recipeItem";

export default async function RecipeList() {
  const recipes = await getAllRecipes();
  return (
    <div className="m-4">
      {recipes && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recipes.map((recipe) => {
            return <RecipeItem key={recipe.id} recipe={recipe} />;
          })}
        </ul>
      )}
      {!recipes && <p>No recipes</p>}
    </div>
  );
}
