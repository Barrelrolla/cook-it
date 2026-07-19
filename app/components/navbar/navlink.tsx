"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavbarLink,
  NavbarLinkProps,
} from "@barrelrolla/react-components-library";

export default function Navlink({
  href,
  children,
  ...rest
}: { href: string } & NavbarLinkProps<"a">) {
  const path = usePathname();
  return (
    <NavbarLink
      as={Link}
      href={href}
      selected={path.startsWith(href)}
      className="selected:text-primary-content"
      {...rest}
    >
      {children}
    </NavbarLink>
  );
}
