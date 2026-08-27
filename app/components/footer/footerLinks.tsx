"use client";
import {
  FooterLink,
  FooterLinkGroup,
} from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import Link from "next/link";

type LinkType = "about" | "privacy" | "terms" | "contact";
export default function FooterLinks() {
  const t = useTranslations("Footer");

  const links: LinkType[] = ["about", "privacy", "terms", "contact"];
  return (
    <FooterLinkGroup className="flex flex-col md:flex-row h-full items-center gap-1 md:gap-4">
      {links.map((link) => {
        return (
          <FooterLink color="main" as={Link} key={link} href={`/${link}`}>
            {t(link)}
          </FooterLink>
        );
      })}
    </FooterLinkGroup>
  );
}
