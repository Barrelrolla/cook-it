import { getIsLiked, RecipeWithRelations } from "@/app/actions/recipeActions";
import RecipeHero from "@/app/components/hero/baseHero";
import UserAvatar from "@/app/components/userAvatar";
import {
  formatCategory,
  formatDiet,
  formatDifficulty,
} from "@/constants/recipeHelpers";
import { formatCookTime } from "@/utils/helpers";
import {
  Badge,
  Card,
  ColorType,
  HeroSection,
  HeroText,
  HeroTitle,
} from "@barrelrolla/react-components-library";
import { getTranslations } from "next-intl/server";
import { PiClock, PiForkKnife } from "react-icons/pi";
import RecipeActionButtons from "./recipeActionButtons";
import { MoreRecipesButton } from "./moreRecipesButton";
import { ReactNode } from "react";

type RecipePageProps = {
  recipe: RecipeWithRelations;
};

function RecipeMetadata({
  label,
  icon,
  text,
}: {
  label: string;
  icon: ReactNode;
  text: string;
}) {
  return (
    <div>
      <span>{label}</span>
      <span className="flex items-center gap-1">
        {icon}
        {text}
      </span>
    </div>
  );
}

export default async function RecipePageHero({ recipe }: RecipePageProps) {
  const {
    imageUrl,
    title,
    description,
    difficulty,
    category,
    cuisine,
    diet,
    prepTime,
    cookTime,
    servings,
    author,
  } = recipe;
  let color: ColorType = "success";
  if (difficulty === "medium") {
    color = "warning";
  } else if (difficulty === "hard") {
    color = "error";
  }

  const t = await getTranslations("RecipePage");
  const isLiked = await getIsLiked(recipe.id);
  return (
    <RecipeHero imageUrl={imageUrl} imageAlt={t("img-alt")}>
      <HeroSection className="justify-end">
        <div className="max-w-full flex flex-col gap-4 md:gap-8 p-4 items-center md:items-start">
          <div className="md:max-w-[50%]">
            {difficulty && (
              <Badge color={color} className="w-fit self-start">
                {formatDifficulty(difficulty)}
              </Badge>
            )}
            <HeroTitle className="font-heading font-normal text-5xl md:text-6xl px-0">
              {title}
            </HeroTitle>
            <HeroText className="px-0">{description}</HeroText>
          </div>
          {author && (
            <div className="flex items-center gap-4">
              <UserAvatar
                className="size-12"
                avatarUrl={author.image || ""}
                name={author.name}
              />
              <div>
                <span className="text-sm">{author.name}</span>
                <span className="block text-xs">@{author.username}</span>
              </div>
              <MoreRecipesButton href={`/user/${author.username}`} />
            </div>
          )}
          <div className="flex justify-center flex-row flex-wrap gap-2">
            <Badge className="w-fit">{formatCategory(category)}</Badge>
            {cuisine && (
              <Badge color="secondary" className="w-fit">
                {cuisine.name}
              </Badge>
            )}
            {diet &&
              diet.length > 0 &&
              diet.map((d) => (
                <Badge color="accent" key={d} className="w-fit inline">
                  {formatDiet(d)}
                </Badge>
              ))}
          </div>
          <Card
            containerClassName="max-w-full w-fit"
            className="text-primary py-2 flex flex-row flex-wrap gap-4 items-center"
          >
            <div className="flex flex-row flex-wrap gap-8 px-4">
              {prepTime && (
                <RecipeMetadata
                  label={t("preparation-time")}
                  icon={<PiClock />}
                  text={formatCookTime(t, prepTime)}
                />
              )}
              {cookTime && (
                <RecipeMetadata
                  label={t("cook-time")}
                  icon={<PiClock />}
                  text={formatCookTime(t, cookTime)}
                />
              )}
              {servings && (
                <RecipeMetadata
                  label={t("servings")}
                  icon={<PiForkKnife />}
                  text={servings.toString()}
                />
              )}
            </div>
            <RecipeActionButtons recipe={recipe} isLiked={isLiked} />
          </Card>
        </div>
      </HeroSection>
    </RecipeHero>
  );
}
