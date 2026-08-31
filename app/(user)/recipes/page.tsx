import { Suspense } from "react";
import RecipeList from "@/app/components/recipes/recipeList";
import RecipeListLoading from "@/app/components/recipes/recipeListLoading";
import { getRecipesWithQuery } from "@/app/actions/recipeActions";
import SearchButton from "@/app/components/searchButton";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPaginationParams } from "@/utils/helpers";
import {
  recipeCategoryEnum,
  recipeDifficultyEnum,
  restrictedDietEnum,
} from "@/db/schemas/recipe-schema";
import { getAllCuisines, getCuisineId } from "@/app/actions/cuisineActions";

type RecipePageProps = {
  searchParams: Promise<{
    query?: string;
    category?: string;
    difficulty?: string;
    cuisine?: string;
    diet: string[];
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
  const params = await searchParams;
  const cuisines = await getAllCuisines();
  const { query, page, category, difficulty, cuisine, diet } = params;
  const pageSize = 12;
  const { offset } = getPaginationParams(pageSize, page);
  const foundCuisine = cuisine ? await getCuisineId(cuisine) : undefined;
  const diets = Array.isArray(diet) ? diet : diet ? [diet] : [];

  const recipesPromise = getRecipesWithQuery(
    {
      query,
      category: category as (typeof recipeCategoryEnum.enumValues)[number],
      difficulty:
        difficulty as (typeof recipeDifficultyEnum.enumValues)[number],
      cuisine: foundCuisine ? foundCuisine.id : undefined,
      diet: diets as typeof restrictedDietEnum.enumValues,
    },
    pageSize,
    offset,
  );

  return (
    <main>
      <div className="px-2 pt-4">
        <SearchButton
          initialQuery={query}
          initialCategory={category}
          initialCuisine={cuisine}
          initialDifficulty={difficulty}
          initialDiet={diet}
          cuisines={cuisines?.map((cuisine) => cuisine.name)}
          showFilters
        />
      </div>
      <Suspense key={JSON.stringify(params)} fallback={<RecipeListLoading />}>
        <RecipeList
          recipesPromise={recipesPromise}
          showPagination
          pageSize={pageSize}
        />
      </Suspense>
    </main>
  );
}
