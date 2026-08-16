"use client";

import Link from "next/link";
import { Anchor } from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";

export default function RecipeNotFound() {
  const t = useTranslations("RecipePage");
  return (
    <main>
      <p>
        {t.rich("recipe-not-found", {
          recipeList: (chunks) => (
            <Anchor href="/recipes" as={Link}>
              {chunks}
            </Anchor>
          ),
          home: (chunks) => (
            <Anchor href="/" as={Link}>
              {chunks}
            </Anchor>
          ),
        })}
      </p>
    </main>
  );
}
