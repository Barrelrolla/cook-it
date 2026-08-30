"use client";
import { Anchor } from "barrelrolla-ui";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function AboutLink({
  url,
  children,
}: { url: string } & PropsWithChildren) {
  return (
    <Anchor as={Link} href={url}>
      {children}
    </Anchor>
  );
}
