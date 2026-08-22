"use client";
import { IS_DEV } from "@/utils/helpers";
import { Button, ButtonGroup } from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import { PiBookmark, PiHeart, PiShareNetwork } from "react-icons/pi";

export default function RecipeActionButtons() {
  const t = useTranslations("RecipePage");
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
    <ButtonGroup variant="ghost">
      <Button startIcon={<PiHeart />}>{t("like-button")}</Button>
      <Button startIcon={<PiBookmark />}>{t("save-button")}</Button>
      <Button onClick={handleShare} startIcon={<PiShareNetwork />}>
        {t("share-button")}
      </Button>
    </ButtonGroup>
  );
}
