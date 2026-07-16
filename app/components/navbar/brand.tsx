"use client";
import { NavbarBrand } from "@barrelrolla/react-components-library";
import Link from "next/link";
import Logo from "../logo";
import { BRAND_NAME } from "@/utils/constants";

export default function Brand() {
  return (
    <NavbarBrand
      as={Link}
      href="/"
      className="font-logo text-4xl font-normal flex items-center gap-2"
    >
      <span className="text-primary-content">
        <Logo />
      </span>
      {BRAND_NAME}
    </NavbarBrand>
  );
}
