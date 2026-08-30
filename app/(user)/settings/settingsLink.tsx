"use client";

import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";
import { Button } from "barrelrolla-ui";

export default function SettingsLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Button
      color="main"
      className="flex justify-between"
      variant="ghost"
      as={Link}
      href={href}
      scaling={false}
    >
      <span>{label}</span>
      <PiArrowRight />
    </Button>
  );
}
