"use client";
import { DarkModeToggle } from "@barrelrolla/react-components-library";
import { useEffect, useState } from "react";

export default function ThemeToggleButton({
  ariaLabel,
}: {
  ariaLabel: string;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  if (isClient) {
    return (
      <DarkModeToggle
        aria-label={ariaLabel}
        color="main"
        variant="ghost"
        className="size-10"
      />
    );
  } else return null;
}
