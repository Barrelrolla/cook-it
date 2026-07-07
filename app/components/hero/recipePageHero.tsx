import { PiStarFill } from "react-icons/pi";
import RecipeHero from "./recipeHero";
import {
  Badge,
  ColorType,
  HeroSection,
  HeroText,
  HeroTitle,
} from "@barrelrolla/react-components-library";
import { RecipeItemType } from "../recipes/recipeItem";

type Props = {
  recipe: RecipeItemType;
};

export default function RecipePageHero({ recipe }: Props) {
  const { imageUrl, title, rating, ratingsCount, author, difficulty } = recipe;
  let color: ColorType = "success";
  if (difficulty === "medium") {
    color = "warning";
  } else if (difficulty === "hard") {
    color = "error";
  }
  return (
    <RecipeHero imageUrl={imageUrl} imageAlt="The cooked meal">
      <HeroSection className="justify-end md:justify-center mb-2">
        <Badge color={color} className="w-fit ml-4">
          {recipe.difficulty}
        </Badge>
        <HeroTitle className="font-heading font-normal text-5xl md:text-6xl">
          {title}
        </HeroTitle>
        <HeroText className="">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet, rerum?
          Reiciendis possimus veritatis tempore, nemo laboriosam eligendi
          aliquid deserunt. Placeat doloribus excepturi est officia laborum.
        </HeroText>
        <p className="px-4 flex items-center">
          <span className="flex items-center text-primary-content">
            <PiStarFill />
            {rating}{" "}
          </span>
          <span className="text-main-content"> ({ratingsCount} reviews)</span> •{" "}
          by {author}
        </p>
      </HeroSection>
      <HeroSection className="hidden md:block" />
    </RecipeHero>
  );
}
