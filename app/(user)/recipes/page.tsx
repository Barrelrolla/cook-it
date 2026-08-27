import { Suspense } from "react";
import RecipeList from "@/app/components/recipes/recipeList";
import RecipeListLoading from "@/app/components/recipes/recipeListLoading";
import {
  getAllRecipes,
  getRecipesWithQuery,
} from "@/app/actions/recipeActions";
import SearchButton from "@/app/components/searchButton";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPaginationParams } from "@/utils/helpers";

type RecipePageProps = {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: RecipePageProps): Promise<Metadata> {
  const { query } = await searchParams;
  const tGlobal = await getTranslations("Global");

  return {
    metadataBase: new URL(process.env.BASE_URL!),
    title: query
      ? `${tGlobal("metadata-search", { query })} | ${tGlobal("brand-name")}`
      : `${tGlobal("metadata-no-query")} | ${tGlobal("brand-name")}`,
  };
}

export default async function RecipesPage({ searchParams }: RecipePageProps) {
  const { query, page } = await searchParams;
  const pageSize = 12;
  const { offset } = getPaginationParams(pageSize, page);

  let recipesPromise;
  if (query) {
    recipesPromise = getRecipesWithQuery(query, pageSize, offset);
  } else {
    recipesPromise = getAllRecipes(pageSize, offset);
  }
  return (
    <main>
      <div className="px-2 pt-4">
        <SearchButton initialQuery={query} />
      </div>
      <Suspense fallback={<RecipeListLoading />}>
        <RecipeList
          recipesPromise={recipesPromise}
          showPagination
          pageSize={pageSize}
        />
      </Suspense>
    </main>
  );
}
