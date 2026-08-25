import { getRecipesByCategory } from "@/app/actions/recipeActions";
import RecipeList from "@/app/components/recipes/recipeList";
import RecipeListLoading from "@/app/components/recipes/recipeListLoading";
import { recipeCategoryEnum } from "@/db/schemas/recipe-schema";
import { Suspense } from "react";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const recipesPromise = getRecipesByCategory(
    category as (typeof recipeCategoryEnum.enumValues)[number],
  );
  return (
    <main className="p-4">
      <Suspense fallback={<RecipeListLoading />}>
        <RecipeList recipesPromise={recipesPromise} />
      </Suspense>
    </main>
  );
}
