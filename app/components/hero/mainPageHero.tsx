import {
  HeroActions,
  HeroSection,
  HeroText,
  HeroTitle,
} from "@barrelrolla/react-components-library";
import RecipeHero from "./recipeHero";
import heroLight from "../../../public/hero-light.png";
import heroDark from "../../../public/hero-dark.png";
import { ShareButton, ExploreButton } from "./actionButtons";

export default function MainPageHero() {
  return (
    <RecipeHero
      imageUrl={heroLight.src}
      darkImageUrl={heroDark.src}
      imageAlt="A bowl of pasta"
    >
      <HeroSection className="justify-end md:justify-center mb-2">
        <HeroTitle className="font-heading text-6xl md:text-7xl">
          Discover. Cook.
          <br />
          <span className="text-primary-content">Share.</span>
        </HeroTitle>
        <HeroText className="md:max-w-2/3">
          Join a community of food lovers. Share your recipes, new favourites,
          and let AI help you cook something amazing.
        </HeroText>
        <HeroActions className="justify-start gap-2">
          <ShareButton />
          <ExploreButton />
        </HeroActions>
      </HeroSection>
      <HeroSection className="hidden md:block" />
    </RecipeHero>
  );
}
