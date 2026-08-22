"use client";
import {
  likeRecipe,
  RecipeWithRelations,
  unlikeRecipe,
} from "@/app/actions/recipeActions";
import { IS_DEV } from "@/utils/helpers";
import { Button, ButtonGroup } from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import { startTransition, useOptimistic } from "react";
import {
  PiBookmark,
  PiHeart,
  PiHeartFill,
  PiShareNetwork,
} from "react-icons/pi";

export default function RecipeActionButtons({
  recipe,
  isLiked,
}: {
  recipe: RecipeWithRelations;
  isLiked: boolean;
}) {
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(isLiked);
  const t = useTranslations("RecipePage");

  async function handleLikeButton() {
    const nextLiked = !optimisticLiked;

    startTransition(async () => {
      setOptimisticLiked(nextLiked);

      if (nextLiked) {
        await likeRecipe(recipe.id, recipe.slug);
      } else {
        await unlikeRecipe(recipe.id, recipe.slug);
      }
    });
  }

  async function handleShare() {
    const shareData = {
      title: "recipe",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (IS_DEV) {
          console.error(error);
        }
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    // TODO: show toast
  }

  return (
    <ButtonGroup variant="ghost" className="md:pr-4">
      <Button
        wrapperClassName="min-w-26"
        className="px-0 w-full"
        onClick={handleLikeButton}
        startIcon={optimisticLiked ? <PiHeartFill /> : <PiHeart />}
      >
        {optimisticLiked ? t("liked-button") : t("like-button")}
      </Button>
      <Button
        wrapperClassName="min-w-26"
        className="px-0 w-full"
        startIcon={<PiBookmark />}
      >
        {t("save-button")}
      </Button>
      <Button
        wrapperClassName="min-w-26"
        className="px-0 w-full"
        onClick={handleShare}
        startIcon={<PiShareNetwork />}
      >
        {t("share-button")}
      </Button>
    </ButtonGroup>
  );
}
