"use client";
import { PropsWithChildren } from "react";
import Image from "next/image";
import { Hero, useTheme } from "@barrelrolla/react-components-library";

export default function RecipeHero({
  imageUrl,
  darkImageUrl,
  imageAlt,
  initialDark,
  children,
}: {
  imageUrl: string;
  darkImageUrl?: string;
  initialDark?: boolean;
  imageAlt: string;
} & PropsWithChildren) {
  const theme = useTheme();
  const isDark = theme?.isDark === undefined ? initialDark : theme.isDark;

  return (
    <Hero
      textAlign="left"
      className="h-130 md:h-150 overflow-y-hidden relative max-w-[2000px] justify-center"
    >
      <div className="absolute h-[80%] md:h-full w-full md:w-[70%] justify-self-end inset-0">
        {(!darkImageUrl || (darkImageUrl && isDark !== undefined)) && (
          <Image
            src={darkImageUrl && isDark ? darkImageUrl : imageUrl}
            alt={imageAlt}
            fill
            sizes="70vw"
            priority
            className={"object-cover"}
          />
        )}
        <div className="max-md:hero-fade-mobile md:hero-fade" />
      </div>
      <div className="flex justify-end pb-2 h-full md:w-(--max-content-width) relative">
        {children}
      </div>
    </Hero>
  );
}
