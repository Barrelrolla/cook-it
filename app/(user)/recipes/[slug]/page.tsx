import { getRecipeBySlug } from "@/db";
import { notFound } from "next/navigation";

export default async function RecipeItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) {
    notFound();
  }
  return <div>{`recipe ${recipe.title}`}</div>;
}
