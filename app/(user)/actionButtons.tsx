"use client";
import Link from "next/link";
import { Button } from "@barrelrolla/react-components-library";
import { PiArrowRightBold, PiPlusBold } from "react-icons/pi";
import { useTranslations } from "next-intl";

export function ShareButton() {
  const t = useTranslations("HomeHero");
  return (
    <Button as={Link} href={"/share"} color="primary">
      {t("share-button")}
      <PiPlusBold />
    </Button>
  );
}

export function ExploreButton() {
  const t = useTranslations("HomeHero");
  return (
    <Button as={Link} href="/recipes" variant="ghost" color="main">
      {t("explore-button")} <PiArrowRightBold />
    </Button>
  );
}
