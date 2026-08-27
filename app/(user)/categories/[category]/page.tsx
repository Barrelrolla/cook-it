import { getRecipesByCategory } from "@/app/actions/recipeActions";
import RecipeList from "@/app/components/recipes/recipeList";
import RecipeListLoading from "@/app/components/recipes/recipeListLoading";
import { recipeCategoryEnum } from "@/db/schemas/recipe-schema";
import { getPaginationParams } from "@/utils/helpers";
import { Suspense } from "react";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { page } = await searchParams;
  const pageSize = 20;
  const { offset } = getPaginationParams(pageSize, page);
  const recipesPromise = getRecipesByCategory(
    category as (typeof recipeCategoryEnum.enumValues)[number],
    pageSize,
    offset,
  );
  return (
    <main className="p-4">
      <Suspense fallback={<RecipeListLoading />}>
        <RecipeList recipesPromise={recipesPromise} />
      </Suspense>
    </main>
  );
}
