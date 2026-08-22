import { RecipeWithRelationsPromise } from "@/app/actions/recipeActions";
import RecipeItem from "./recipeItem";
import { getTranslations } from "next-intl/server";
import { getSession } from "@/app/actions/authActions";

export default async function RecipeList({
  recipesPromise,
}: {
  recipesPromise: RecipeWithRelationsPromise | null;
}) {
  const t = await getTranslations("RecipePage");
  const recipes = await recipesPromise;
  const session = await getSession();
  const user = session ? JSON.parse(JSON.stringify(session.user)) : null;

  return (
    <div className="m-4">
      {recipes && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recipes.map((recipe) => {
            return <RecipeItem key={recipe.id} recipe={recipe} user={user} />;
          })}
        </ul>
      )}
      {(!recipes || recipes.length === 0) && <p>{t("no-recipes-found")}</p>}
    </div>
  );
}
