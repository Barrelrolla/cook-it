"use client";
import { NavbarBrand } from "@barrelrolla/react-components-library";
import Link from "next/link";
import logoLight from "@/public/logo-light.svg";
import logoDark from "@/public/logo-dark.svg";
import { BRAND_NAME } from "@/utils/constants";
import Image from "next/image";

export default function Brand() {
  return (
    <NavbarBrand
      as={Link}
      href="/"
      className="font-logo text-4xl font-normal flex items-center gap-2"
    >
      <div className="h-18 overflow-clip flex">
        <Image
          className="object-cover block dark:hidden"
          src={logoLight}
          alt={`${BRAND_NAME} logo`}
          height={72}
          width={144}
        />
        <Image
          className="object-cover hidden dark:block"
          src={logoDark}
          alt={`${BRAND_NAME} logo`}
          height={72}
          width={144}
        />
      </div>
    </NavbarBrand>
  );
}
