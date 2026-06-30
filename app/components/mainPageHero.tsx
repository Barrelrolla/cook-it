import {
  Hero,
  HeroSection,
  HeroText,
  HeroTitle,
} from "@barrelrolla/react-components-library";

export default function MainPageHero() {
  return (
    <Hero
      textAlign="left"
      className="h-130 md:h-150"
      wrapperClasses="not-md:not-dark:bg-fade-down dark:bg-fade-down-dark not-dark:md:bg-fade-left md:dark:bg-fade-left-dark"
    >
      <HeroSection className="md:ml-20 justify-end md:justify-center mb-2">
        <HeroTitle className="font-heading font-bold text-6xl md:text-7xl">
          Discover. Cook.
          <br />
          <span className="text-primary-content">Share.</span>
        </HeroTitle>
        <HeroText className="max-w-2/3">
          Join a community of food lovers. Share your recipes, discover new
          favourites, and let AI help you cook something amazing.
        </HeroText>
      </HeroSection>
      <HeroSection className="hidden md:block" />
    </Hero>
  );
}
