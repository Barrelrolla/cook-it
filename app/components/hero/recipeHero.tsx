"use client";
import { PropsWithChildren } from "react";
import Image from "next/image";
import { Hero, useTheme } from "@barrelrolla/react-components-library";

export default function RecipeHero({
  imageUrl,
  darkImageUrl,
  imageAlt,
  children,
}: {
  imageUrl: string;
  darkImageUrl?: string;
  imageAlt: string;
} & PropsWithChildren) {
  const imgClasses =
    "object-cover" + (darkImageUrl ? " block dark:hidden" : "");
  const theme = useTheme();
  const isDark = theme?.isDark;
  return (
    <Hero
      textAlign="left"
      className="h-130 md:h-150 overflow-y-hidden relative max-w-[2000px] justify-center"
    >
      <div className="absolute h-[80%] md:h-full w-full md:w-[70%] justify-self-end inset-0">
        {(!darkImageUrl || !isDark) && (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="70vw"
            priority
            className={imgClasses}
          />
        )}
        {darkImageUrl && isDark && (
          <Image
            src={darkImageUrl}
            alt={imageAlt}
            fill
            sizes="70vw"
            priority
            className="object-cover hidden dark:block"
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
