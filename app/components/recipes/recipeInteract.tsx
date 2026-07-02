"use client";

import { CardInteract } from "@barrelrolla/react-components-library";
import Link from "next/link";
import { PropsWithChildren } from "react";

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
