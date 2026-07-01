import {
  Badge,
  Card,
  CardImageContainer,
  CardSection,
  CardTitle,
  ColorType,
} from "@barrelrolla/react-components-library";
import { PiStarFill } from "react-icons/pi";
import Image from "next/image";
import RecipeInteract from "./recipeInteract";

export type RecipeItemType = {
  id: number;
  title: string;
  imageUrl: string;
  userName: string;
  timeToPreapare: number;
  difficulty: "easy" | "medium" | "hard";
  isLiked: boolean;
  rating: number;
  ratingsCount: number;
};

export default function RecipeItem({ recipe }: { recipe: RecipeItemType }) {
  const { difficulty } = recipe;
  let color: ColorType = "success";
  if (difficulty === "medium") {
    color = "warning";
  } else if (difficulty === "hard") {
    color = "error";
  }

  return (
    <li className="justify-items-center">
      <Card
        size="xl"
        className="h-60"
        containerClasses="border-main-content/30 shadow-sm min-w-70"
      >
        <RecipeInteract recipeId={recipe.id}>
          <CardImageContainer className="relative">
            <Image
              sizes="320px"
              className="card-image relative"
              fill
              src={recipe.imageUrl}
              alt="recipe image"
            />
          </CardImageContainer>
          <CardSection>
            <CardTitle>{recipe.title}</CardTitle>
            <div className="flex justify-between px-4 pb-2 text-sm">
              <p className="flex items-center">
                <span className="flex items-center text-primary-content">
                  <PiStarFill /> {recipe.rating}
                </span>{" "}
                ({recipe.ratingsCount}) • by {recipe.userName}
              </p>
              <Badge color={color}>{recipe.difficulty}</Badge>
            </div>
          </CardSection>
        </RecipeInteract>
      </Card>
    </li>
  );
}
