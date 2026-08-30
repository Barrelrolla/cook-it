"use client";
import {
  likeRecipe,
  RecipeWithRelations,
  unlikeRecipe,
} from "@/app/actions/recipeActions";
import { saveRecipe, unsaveRecipe } from "@/app/actions/userActions";
import { IS_DEV } from "@/utils/helpers";
import { Button, ButtonGroup } from "barrelrolla-ui";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { startTransition, useOptimistic } from "react";
import {
  PiBookmark,
  PiBookmarkFill,
  PiHeart,
  PiHeartFill,
  PiShareNetwork,
} from "react-icons/pi";

export default function RecipeActionButtons({
  recipe,
  isSignedIn,
  isLiked,
  isSaved,
}: {
  recipe: RecipeWithRelations;
  isSignedIn: boolean;
  isLiked: boolean;
  isSaved: boolean;
}) {
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(isLiked);
  const [optimisticSaved, setOptimisticSaved] = useOptimistic(isSaved);
  const router = useRouter();
  const tGlobal = useTranslations("Global");
  const t = useTranslations("RecipePage");

  async function handleLikeButton() {
    if (!isSignedIn) {
      router.replace(`/recipes/${recipe.slug}/?signin`);
      return;
    }
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

  async function handleSaveButton() {
    if (!isSignedIn) {
      router.replace(`/recipes/${recipe.slug}/?signin`);
      return;
    }

    const nextSaved = !optimisticSaved;
    startTransition(async () => {
      setOptimisticSaved(nextSaved);

      if (nextSaved) {
        await saveRecipe(recipe.id, recipe.slug);
      } else {
        await unsaveRecipe(recipe.id, recipe.slug);
      }
    });
  }

  async function handleShare() {
    const brand = tGlobal("brand-name");
    const shareData = {
      title: t("share-title", { brand }),
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
        onClick={handleSaveButton}
        startIcon={optimisticSaved ? <PiBookmarkFill /> : <PiBookmark />}
      >
        {optimisticSaved ? t("saved-button") : t("save-button")}
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
