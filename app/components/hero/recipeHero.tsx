import { Hero } from "@barrelrolla/react-components-library";
import Image from "next/image";
import { PropsWithChildren } from "react";

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
  return (
    <Hero
      textAlign="left"
      className="h-130 md:h-150 overflow-y-hidden relative max-w-[2000px] justify-center"
    >
      <div className="absolute w-full md:w-[70%] justify-self-end inset-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          className={imgClasses}
        />
        {darkImageUrl && (
          <Image
            src={darkImageUrl}
            alt={imageAlt}
            fill
            priority
            className="object-cover hidden dark:block"
          />
        )}

        {/* Light mode fade */}
        <div className="max-md:hero-fade-mobile md:hero-fade" />
      </div>
      <div className="flex justify-end pb-2 h-full md:w-(--max-content-width) relative">
        {children}
      </div>
    </Hero>
  );
}
