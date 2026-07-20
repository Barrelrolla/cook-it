"use client";
import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME } from "@/utils/constants";
import { NavbarBrand } from "@barrelrolla/react-components-library";
import logoLight from "@/public/logo-light.svg";
import logoDark from "@/public/logo-dark.svg";

export default function Brand() {
  return (
    <NavbarBrand
      as={Link}
      href="/"
      className="font-logo text-4xl font-normal flex items-center gap-2"
    >
      <div className="h-18 overflow-clip flex items-center">
        <div className="h-22 flex">
          <Image
            className="object-cover block dark:hidden -ml-2"
            src={logoLight}
            alt={`${BRAND_NAME} logo`}
            height={88}
            width={200}
            loading="eager"
          />
          <Image
            className="object-cover hidden dark:block -ml-2"
            src={logoDark}
            alt={`${BRAND_NAME} logo`}
            height={88}
            width={200}
            loading="eager"
          />
        </div>
      </div>
    </NavbarBrand>
  );
}
