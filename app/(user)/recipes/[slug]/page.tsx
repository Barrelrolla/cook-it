import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRecipeBySlug } from "@/app/actions/recipeActions";
import RecipePageHero from "@/app/components/hero/recipePageHero";
import { Badge } from "@barrelrolla/react-components-library";
import { PiClock, PiForkKnife } from "react-icons/pi";
import { formatCategory } from "@/constants/categories";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  return {
    metadataBase: new URL(process.env.BASE_URL!),
    title: recipe ? `${recipe?.title} ` : "Recipe not found " + "| Garndish",
    openGraph: { images: recipe?.imageUrl },
  };
}

export default async function RecipeItemPage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) {
    notFound();
  }
  const {
    category,
    cuisine,
    diet,
    servings,
    prepTime,
    cookTime,
    ingredients,
    instructions,
  } = recipe;
  return (
    <>
      <RecipePageHero recipe={recipe} />
      <main className="p-4">
        <Badge className="w-fit inline">{formatCategory(category)}</Badge>
        {cuisine && (
          <Badge color="secondary" className="w-fit inline">
            {cuisine.name}
          </Badge>
        )}
        {diet && (
          <div>
            {diet.map((diet) => (
              <Badge color="accent" className="w-fit inline" key={diet}>
                {diet}
              </Badge>
            ))}
          </div>
        )}
        {prepTime && (
          <div>
            <PiClock className="inline" />
            {prepTime}
          </div>
        )}
        {cookTime && (
          <div>
            <PiClock className="inline" />
            {cookTime}
          </div>
        )}
        {servings && (
          <div>
            <PiForkKnife className="inline" />
            {`${servings} serving${servings > 1 ? "s" : ""}`}
          </div>
        )}
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
        <ul>
          {instructions.map((step, index) => (
            <li key={"step " + index}>{step}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
