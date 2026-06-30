"use client";
import { NavbarBrand } from "@barrelrolla/react-components-library";
import LogoImage from "../../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Brand() {
  return (
    <NavbarBrand
      as={Link}
      href="/"
      className="font-logo flex items-center gap-2"
    >
      <span className="text-primary-content">
        <Image
          src={LogoImage}
          alt="logo depicting a chef's hat"
          className="h-10 w-10"
          priority
        />
      </span>
      CookIt
    </NavbarBrand>
  );
}
