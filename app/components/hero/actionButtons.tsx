"use client";
import Link from "next/link";
import { Button } from "@barrelrolla/react-components-library";
import { PiArrowRightBold, PiPlusBold } from "react-icons/pi";

export function ShareButton() {
  return (
    <Button as={Link} href={"/share"}>
      Share recipe <PiPlusBold />
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
      Explore recipes <PiArrowRightBold />
    </Button>
  );
}
