"use client";
import { Anchor } from "@barrelrolla/react-components-library";
import Link from "next/link";

export default function RecipeNotFound() {
  return (
    <main>
      We couldn&apos;t find that recipe. Please visit the{" "}
      <Anchor href="/recipes" as={Link}>
        recipe list
      </Anchor>{" "}
      or go back to the{" "}
      <Anchor as={Link} href="/">
        Home page
      </Anchor>
    </main>
  );
}
