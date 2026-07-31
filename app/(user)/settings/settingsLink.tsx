"use client";

import { Button } from "@barrelrolla/react-components-library";
import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";

export default function SettingsLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Button
      className="flex justify-between"
      variant="ghost"
      as={Link}
      href={href}
    >
      <span>{label}</span>
      <PiArrowRight />
    </Button>
  );
}
