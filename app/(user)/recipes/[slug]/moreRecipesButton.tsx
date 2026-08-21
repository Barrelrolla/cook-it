"use client";

import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";
import { Button } from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";

type MoreRecipesButtonProps = { href: string };
export function MoreRecipesButton({ href }: MoreRecipesButtonProps) {
  const t = useTranslations("RecipePage");
  return (
    <Button
      size="sm"
      variant="outline"
      className="min-h-8.5 h-fit"
      href={href}
      as={Link}
    >
      {t("see-more-button")}
      <PiArrowRight />
    </Button>
  );
}
