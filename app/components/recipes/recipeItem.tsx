import { CSSProperties } from "react";
import Image from "next/image";
import RecipeInteract from "./recipeInteract";
import {
  Badge,
  Card,
  CardImageContainer,
  CardSection,
  CardTitle,
  ColorType,
} from "@barrelrolla/react-components-library";
import { RecipeWithRelations } from "@/app/actions/recipeActions";

export default function RecipeItem({
  recipe,
}: {
  recipe: RecipeWithRelations;
}) {
  const { difficulty } = recipe;
  const name = recipe.author?.name || "Deleted user";
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
        containerClassName=" shadow-sm shadow-main-content/20 w-full"
        containerStyle={{ "--bg-color": "var(--color-muted)" } as CSSProperties}
      >
        <RecipeInteract recipeSlug={recipe.slug}>
          <CardImageContainer className="relative">
            <Image
              sizes="320px"
              className="card-image relative"
              fill
              src={recipe.imageUrl}
              alt="the end result of the recipe"
            />
          </CardImageContainer>
          <CardSection>
            <CardTitle>{recipe.title}</CardTitle>
            <div className="flex justify-between px-4 pb-2 text-sm">
              <p className="flex items-center">by {name}</p>
              <Badge color={color}>{recipe.difficulty}</Badge>
            </div>
          </CardSection>
        </RecipeInteract>
      </Card>
    </li>
  );
}
