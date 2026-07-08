import { getRecipeBySlug } from "@/app/actions/recipeActions";
import RecipePageHero from "@/app/components/hero/recipePageHero";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  return {
    metadataBase: new URL(process.env.BASE_URL!),
    title: `${recipe?.title} | Cook-it`,
    openGraph: { images: recipe?.imageUrl },
  };
}

export default async function RecipeItemPage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) {
    notFound();
  }
  return (
    <>
      <RecipePageHero recipe={recipe} />
    </>
  );
}
