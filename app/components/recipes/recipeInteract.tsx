"use client";

import { CardInteract } from "@barrelrolla/react-components-library";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function RecipeInteract({
  recipeId,
  children,
}: { recipeId: number } & PropsWithChildren) {
  return (
    <CardInteract
      as={Link}
      href={`/recipes/${recipeId}`}
      className="flex flex-col"
    >
      {children}
    </CardInteract>
  );
}
