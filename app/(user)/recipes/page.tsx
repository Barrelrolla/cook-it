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

type RecipePageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export async function generateMetadata({
  searchParams,
}: RecipePageProps): Promise<Metadata> {
  const query = (await searchParams).query?.toString();
  const tGlobal = await getTranslations("Global");

  return {
    metadataBase: new URL(process.env.BASE_URL!),
    title: query
      ? `${tGlobal("metadata-search", { query })} | ${tGlobal("brand-name")}`
      : `${tGlobal("metadata-no-query")} | ${tGlobal("brand-name")}`,
  };
}

export default async function RecipesPage({ searchParams }: RecipePageProps) {
  const query = (await searchParams).query?.toString();

  let recipesPromise;
  if (query) {
    recipesPromise = getRecipesWithQuery(query);
  } else {
    recipesPromise = getAllRecipes();
  }
  return (
    <main className="max-w-(--max-content-width) mx-auto mt-26">
      <SearchButton initialQuery={query} />
      <Suspense fallback={<RecipeListLoading />}>
        <RecipeList recipesPromise={recipesPromise} />
      </Suspense>
    </main>
  );
}
