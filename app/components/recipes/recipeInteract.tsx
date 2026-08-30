"use client";

import { PropsWithChildren } from "react";
import Link from "next/link";
import { CardInteract } from "barrelrolla-ui";

export default function RecipeInteract({
  recipeSlug,
  children,
}: { recipeSlug: string } & PropsWithChildren) {
  return (
    <CardInteract
      as={Link}
      href={`/recipes/${recipeSlug}`}
      className="flex flex-col"
    >
      {children}
    </CardInteract>
  );
}
