import { RecipeWithRelations } from "@/app/actions/recipeActions";
import RecipeHero from "@/app/components/hero/baseHero";
import { formatDifficulty } from "@/constants/recipeHelpers";
import {
  Badge,
  ColorType,
  HeroSection,
  HeroText,
  HeroTitle,
} from "@barrelrolla/react-components-library";
import { getTranslations } from "next-intl/server";

type RecipePageProps = {
  recipe: RecipeWithRelations;
};

export default async function RecipePageHero({ recipe }: RecipePageProps) {
  const t = await getTranslations("RecipePage");
  const tUser = await getTranslations("Recipes.User");
  const { imageUrl, title, author, difficulty } = recipe;
  let color: ColorType = "success";
  if (difficulty === "medium") {
    color = "warning";
  } else if (difficulty === "hard") {
    color = "error";
  }
  const name = author?.name || tUser("deleted");

  return (
    <RecipeHero imageUrl={imageUrl} imageAlt={t("img-alt")}>
      <HeroSection className="justify-end md:justify-center mb-2">
        {recipe.difficulty && (
          <Badge color={color} className="w-fit ml-4">
            {formatDifficulty(recipe.difficulty)}
          </Badge>
        )}
        <HeroTitle className="font-heading font-normal text-5xl md:text-6xl">
          {title}
        </HeroTitle>
        <HeroText className="">{recipe.description}</HeroText>
        <p className="px-4 flex items-center text-sm">
          {t("author", { name })}
        </p>
      </HeroSection>
      <HeroSection className="hidden md:block" />
    </RecipeHero>
  );
}
