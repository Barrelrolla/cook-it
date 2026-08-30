/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { RecipeWithRelations } from "@/app/actions/recipeActions";
import { formatCookTime } from "@/utils/helpers";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function RecipePrint({
  recipe,
}: {
  recipe: RecipeWithRelations;
}) {
  const tGlobal = useTranslations("Global");
  const tR = useTranslations("RecipePage");
  const t = useTranslations("Print");
  const printRef = useRef<HTMLDivElement | null>(null);
  const {
    slug,
    title,
    imageUrl,
    author,
    prepTime,
    cookTime,
    servings,
    ingredients,
    instructions,
  } = recipe;

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: slug,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrint]);

  return (
    <>
      <div className="print-only-container">
        <div ref={printRef} className="bg-white text-black p-4">
          <h1 className="w-full text-center text-2xl">{`${title} | ${tGlobal("brand-name")}`}</h1>
          <div className="w-full mx-auto">
            <img src={imageUrl} className="h-80 mx-auto" />
            <div className="flex flex-wrap gap-6 w-full justify-center">
              {author?.name && <p>{t("author", { name: author.name })}</p>}
              <p>{t("host")}</p>
            </div>
            <div className="flex flex-wrap gap-6 w-full justify-center">
              {prepTime && (
                <p>{t("prepTime", { time: formatCookTime(tR, prepTime) })}</p>
              )}
              {cookTime && (
                <p>{t("cookTime", { time: formatCookTime(tR, cookTime) })}</p>
              )}
              {servings && <p>{t("servings", { amount: servings })}</p>}
            </div>
            <div>
              <p className="text-xl mt-2">{tR("ingredient-label")}</p>
              <ol className="list-disc list-inside">
                {ingredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ol>
              <p className="text-xl mt-2">{tR("instructions-label")}</p>
              <ol className="list-decimal list-inside">
                {instructions.map((inst) => (
                  <li key={inst}>{inst}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
