import { RecipeWithRelationsPromise } from "@/app/actions/recipeActions";
import RecipeItem from "./recipeItem";
import { getTranslations } from "next-intl/server";
import { getSession } from "@/app/actions/authActions";
import Pagination from "../pagination/pagination";
import NoRecipesFound from "./noRecipes";

export default async function RecipeList({
  recipesPromise,
  showPagination,
  pageSize = 20,
}: {
  recipesPromise: RecipeWithRelationsPromise | null;
  showPagination?: boolean;
  pageSize?: number;
}) {
  const t = await getTranslations("RecipePage");
  const result = await recipesPromise;
  const session = await getSession();
  const user = session ? JSON.parse(JSON.stringify(session.user)) : null;

  return (
    <div className="m-4">
      {result && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {result.recipes.map((recipe) => {
            return <RecipeItem key={recipe.id} recipe={recipe} user={user} />;
          })}
        </ul>
      )}
      {(!result || result.recipes.length === 0) && (
        <div className="w-full max-w-200 flex flex-col items-center mx-auto">
          <p>{t("no-recipes-found")}</p>
          <div className="text-main-content/50 w-full h-full">
            <NoRecipesFound />
          </div>
        </div>
      )}
      {showPagination && result && (
        <div className="mt-2">
          <Pagination pageCount={Math.ceil(result.count / pageSize)} />
        </div>
      )}
    </div>
  );
}
