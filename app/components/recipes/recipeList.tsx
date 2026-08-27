import { RecipeWithRelationsPromise } from "@/app/actions/recipeActions";
import RecipeItem from "./recipeItem";
import { getTranslations } from "next-intl/server";
import { getSession } from "@/app/actions/authActions";
import Pagination from "../pagination/pagination";

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
        <p>{t("no-recipes-found")}</p>
      )}
      {showPagination && result && (
        <Pagination pageCount={Math.ceil(result.count / pageSize)} />
      )}
    </div>
  );
}
