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
import { getTranslations } from "next-intl/server";
import { formatDifficulty } from "@/constants/recipeHelpers";

export default async function RecipeItem({
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
  const t = await getTranslations("RecipePage");

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
              alt={t("img-alt")}
            />
          </CardImageContainer>
          <CardSection>
            <CardTitle>{recipe.title}</CardTitle>
            <div className="flex justify-between px-4 pb-2 text-sm">
              <p className="flex items-center">{t("author", { name })}</p>
              {recipe.difficulty && (
                <Badge color={color}>
                  {formatDifficulty(recipe.difficulty)}
                </Badge>
              )}
            </div>
          </CardSection>
        </RecipeInteract>
      </Card>
    </li>
  );
}
