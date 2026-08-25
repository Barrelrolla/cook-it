"use client";
import Link from "next/link";
import { FooterBrand } from "@barrelrolla/react-components-library";
import Logo from "./logo";
import { useTranslations } from "next-intl";

export default function Brand() {
  const t = useTranslations("Footer");
  return (
    <FooterBrand
      aria-label={t("logo-alt")}
      as={Link}
      href="/"
      className="font-logo text-4xl font-normal flex items-center gap-2"
    >
      <div className="h-14 overflow-clip flex items-center">
        <div className="w-50 :h-22 flex text-main-content">
          <Logo />
        </div>
      </div>
    </FooterBrand>
  );
}
