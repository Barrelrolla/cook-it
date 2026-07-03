import RecipeHero from "./recipeHero";
import {
  HeroSection,
  HeroText,
  HeroTitle,
} from "@barrelrolla/react-components-library";

type Props = {
  recipeName: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
};

export default function RecipePageHero({
  recipeName,
  description,
  imageUrl,
  imageAlt,
}: Props) {
  return (
    <RecipeHero imageUrl={imageUrl} imageAlt={imageAlt}>
      <HeroSection className="justify-end md:justify-center mb-2">
        <HeroTitle className="font-heading font-normal text-5xl md:text-6xl">
          {recipeName}
        </HeroTitle>
        {description && (
          <HeroText className="max-w-2/3">{description}</HeroText>
        )}
      </HeroSection>
      <HeroSection className="hidden md:block" />
    </RecipeHero>
  );
}
