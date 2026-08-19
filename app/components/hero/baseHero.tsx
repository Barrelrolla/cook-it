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
      className="h-fit md:h-150 overflow-y-hidden relative max-w-[2560px] justify-center"
    >
      <div className="absolute h-[50vh] md:h-full w-full md:w-[60%] justify-self-end inset-0 md:mask-l-from-60% mask-b-from-40% md:mask-b-from-100%">
        {(!darkImageUrl || (darkImageUrl && isDark !== undefined)) && (
          <Image
            src={darkImageUrl && isDark ? darkImageUrl : imageUrl}
            alt={imageAlt}
            fill
            sizes="60vw"
            priority
            className="object-cover object-right"
          />
        )}
      </div>
      <div className="mt-[30vh] md:mt-0 flex justify-end h-full md:w-(--max-content-width) relative">
        {children}
      </div>
    </Hero>
  );
}
