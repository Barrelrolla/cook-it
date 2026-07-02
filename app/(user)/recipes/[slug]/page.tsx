import { getRecipeBySlug } from "@/db";
import {
  Hero,
  HeroSection,
  HeroTitle,
} from "@barrelrolla/react-components-library";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  return {
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
    <div className="max-w-[2000px] mx-auto">
      <Hero
        style={{
          backgroundImage: `url(${recipe.imageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
        }}
      >
        <HeroSection className="max-w-(--max-content-width) mx-auto">
          <HeroTitle className="font-heading">{recipe.title}</HeroTitle>
        </HeroSection>
      </Hero>
    </div>
  );
}
