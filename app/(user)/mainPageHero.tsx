import { cookies } from "next/headers";
import {
  HeroActions,
  HeroSection,
  HeroText,
  HeroTitle,
} from "@barrelrolla/react-components-library";
import heroLight from "../../public/hero-light.png";
import heroDark from "../../public/hero-dark.png";
import RecipeHero from "../components/hero/baseHero";
import { ExploreButton, ShareButton } from "./actionButtons";
import { getTranslations } from "next-intl/server";

export default async function MainPageHero() {
  const cookieStore = await cookies();
  const darkMode = cookieStore.get("darkMode")?.value;
  let isDark = undefined;
  if (darkMode) {
    isDark = darkMode === "dark";
  }

  const t = await getTranslations("HomeHero");

  return (
    <RecipeHero
      imageUrl={heroLight.src}
      darkImageUrl={heroDark.src}
      imageAlt={t("img-alt")}
      initialDark={isDark}
    >
      <HeroSection className="justify-end md:justify-center mb-2">
        <HeroTitle className="font-heading text-6xl md:text-7xl">
          {t("title")}
          <br />
          <span className="text-primary">{t("title-highlight")}</span>
        </HeroTitle>
        <HeroText className="md:max-w-2/3">{t("text")}</HeroText>
        <HeroActions className="justify-start gap-2">
          <ShareButton />
          <ExploreButton />
        </HeroActions>
      </HeroSection>
      <HeroSection className="hidden md:block" />
    </RecipeHero>
  );
}
