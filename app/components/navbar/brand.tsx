"use client";
import Image from "next/image";
import Link from "next/link";
import { NavbarBrand } from "@barrelrolla/react-components-library";
import logoLight from "@/public/logo-light.svg";
import logoDark from "@/public/logo-dark.svg";
import { useTranslations } from "next-intl";

export default function Brand() {
  const tGlobal = useTranslations("Global");
  const t = useTranslations("Navbar");
  return (
    <NavbarBrand
      as={Link}
      href="/"
      className="font-logo text-4xl font-normal flex items-center gap-2"
    >
      <div className="h-14 overflow-clip flex items-center">
        <div className="h-18 w-34 md:w-50 md:h-22 flex">
          <Image
            className="object-cover block dark:hidden -ml-2"
            src={logoLight}
            alt={t("logo-alt", { brand: tGlobal("brand-name") })}
            height={88}
            width={200}
            loading="eager"
          />
          <Image
            className="object-cover hidden dark:block -ml-2"
            src={logoDark}
            alt={t("logo-alt", { brand: tGlobal("brand-name") })}
            height={88}
            width={200}
            loading="eager"
          />
        </div>
      </div>
    </NavbarBrand>
  );
}
