import { RecipeWithRelations } from "@/app/actions/recipeActions";
import RecipeHero from "./recipeHero";
import {
  Badge,
  ColorType,
  HeroSection,
  HeroText,
  HeroTitle,
} from "@barrelrolla/react-components-library";

type Props = {
  recipe: RecipeWithRelations;
};

export default function RecipePageHero({ recipe }: Props) {
  const { imageUrl, title, author, difficulty } = recipe;
  let color: ColorType = "success";
  if (difficulty === "medium") {
    color = "warning";
  } else if (difficulty === "hard") {
    color = "error";
  }
  const name = author?.name || "Deleted user";

  return (
    <RecipeHero imageUrl={imageUrl} imageAlt="The cooked meal">
      <HeroSection className="justify-end md:justify-center mb-2">
        <Badge color={color} className="w-fit ml-4">
          {recipe.difficulty}
        </Badge>
        <HeroTitle className="font-heading font-normal text-5xl md:text-6xl">
          {title}
        </HeroTitle>
        <HeroText className="">{recipe.description}</HeroText>
        <p className="px-4 flex items-center text-sm">by {name}</p>
      </HeroSection>
      <HeroSection className="hidden md:block" />
    </RecipeHero>
  );
}
