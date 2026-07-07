"use client";
import Link from "next/link";
import { Button } from "@barrelrolla/react-components-library";

export function ShareButton() {
  return (
    <Button as={Link} href={"/share"}>
      Share recipe
    </Button>
  );
}

export function ExploreButton() {
  return (
    <Button
      as={Link}
      href="/recipes"
      color="main"
      variant="ghost"
      ghostHover="outline"
    >
      Explore recipes
    </Button>
  );
}
