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
} from "barrelrolla-ui";
import { RecipeWithRelations } from "@/app/actions/recipeActions";
import { getTranslations } from "next-intl/server";
import { formatCategory, formatDifficulty } from "@/constants/recipeHelpers";
import { User } from "@/db/schemas/auth-schema";
import MoreOptionsButton from "./moreOptionsButton";
import { PiHeartFill } from "react-icons/pi";

export default async function RecipeItem({
  user,
  recipe,
}: {
  recipe: RecipeWithRelations;
  user: User | null;
}) {
  const {
    id,
    slug,
    title,
    imageUrl,
    difficulty,
    authorId,
    category,
    cuisine,
    likesCount,
    diet,
  } = recipe;
  let color: ColorType = "success";
  if (difficulty === "medium") {
    color = "warning";
  } else if (difficulty === "hard") {
    color = "error";
  }
  const tDiet = await getTranslations("Recipes.Diet");
  const t = await getTranslations("RecipePage");
  const maxDiets = 3;
  const name = recipe.author?.name || t("deleted-user");

  return (
    <li className="justify-items-center">
      <Card
        size="xl"
        className="h-64 relative"
        containerClassName=" shadow-sm shadow-main-content/20 w-full"
        containerStyle={
          {
            "--bg-color": "var(--color-muted)",
            "--h": "var(--muted-h)",
          } as CSSProperties
        }
      >
        <RecipeInteract recipeSlug={slug}>
          <CardImageContainer className="relative">
            <Image
              sizes="320px"
              className="card-image relative"
              fill
              src={imageUrl}
              alt={t("img-alt")}
              draggable={false}
            />
            {likesCount && (
              <Badge className="absolute bottom-0 right-0 m-1 flex items-center gap-1">
                <PiHeartFill />
                {likesCount}
              </Badge>
            )}
            {diet && (
              <div className="absolute bottom-0 left-0 m-1 gap-1 flex flex-col">
                {diet.map((d, index) => {
                  if (index >= maxDiets) {
                    return null;
                  }
                  return (
                    <Badge
                      color="accent"
                      className="w-fit"
                      key={d + recipe.slug}
                    >
                      {tDiet(d)}
                    </Badge>
                  );
                })}
              </div>
            )}
          </CardImageContainer>
          <CardSection>
            <div className="py-2 px-4">
              <CardTitle className="line-clamp-1 py-0 px-0 font-heading font-medium">
                {title}
              </CardTitle>
            </div>
            <div className="flex flex-wrap gap-1 pl-4 pr-10 pb-2 text-sm">
              {category && (
                <Badge color="primary">{formatCategory(category)}</Badge>
              )}
              {cuisine && <Badge color="secondary">{cuisine.name}</Badge>}
              {difficulty && (
                <Badge className="absolute top-0 left-0 m-1" color={color}>
                  {formatDifficulty(difficulty)}
                </Badge>
              )}
            </div>
            <div className="pl-4 pr-10 pb-1">
              <p className="text-xs line-clamp-1">{t("author", { name })}</p>
            </div>
          </CardSection>
        </RecipeInteract>
        {user && authorId && user.id === authorId && (
          <MoreOptionsButton recipeId={id} recipeSlug={slug} title={title} />
        )}
      </Card>
    </li>
  );
}
