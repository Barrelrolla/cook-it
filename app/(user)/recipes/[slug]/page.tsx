import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRecipeBySlug } from "@/app/actions/recipeActions";
import { getTranslations } from "next-intl/server";
import RecipePageHero from "./recipePageHero";
import { Card } from "@barrelrolla/react-components-library";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  const tGlobal = await getTranslations("Global");
  const t = await getTranslations("RecipePage");

  return {
    metadataBase: new URL(process.env.BASE_URL!),
    title: recipe
      ? `${recipe?.title} | ${tGlobal("brand-name")}`
      : `${t("metadata-not-found")} | ${tGlobal("brand-name")}`,
    description: recipe?.description || tGlobal("metadata-description"),
    openGraph: { images: recipe?.imageUrl },
  };
}

export default async function RecipeItemPage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) {
    notFound();
  }
  const { ingredients, instructions } = recipe;
  const t = await getTranslations("RecipePage");

  return (
    <>
      <RecipePageHero recipe={recipe} />
      <main className="p-4 max-md:pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card containerClassName="h-fit" className="p-4">
            <span className="mb-2">{t("ingredient-label")}</span>
            <ol className="list-disc list-inside">
              {ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ol>
          </Card>
          <Card
            containerClassName="md:col-span-2 max-w-full h-fit"
            className="p-4"
          >
            <span className="mb-2">{t("instructions-label")}</span>
            <ul className="list-decimal list-inside">
              {instructions.map((step, index) => (
                <li key={"step " + index}>{step}</li>
              ))}
            </ul>
          </Card>
        </div>
      </main>
    </>
  );
}
