"use client";
import Link from "next/link";
import { FooterBrand } from "@barrelrolla/react-components-library";
import Logo from "./logo";

export default function Brand() {
  return (
    <FooterBrand
      as={Link}
      href="/"
      className="font-logo text-4xl font-normal flex items-center gap-2"
    >
      <div className="h-14 overflow-clip flex items-center">
        <div className="h-18 w-34 md:w-50 md:h-22 flex text-main-content">
          <Logo />
        </div>
      </div>
    </FooterBrand>
  );
}
