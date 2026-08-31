import { Anchor } from "barrelrolla-ui";
import { getTranslations } from "next-intl/server";
import AboutSection from "./aboutSection";
import AboutMainTitle from "./aboutMainTitle";
import AboutText from "./aboutText";
import AboutTitle from "./aboutTitle";
import AboutLink from "./aboutLink";

export default async function AboutPage() {
  const tGlobal = await getTranslations("Global");
  const brand = tGlobal("brand-name");
  const t = await getTranslations("AboutPage");
  return (
    <main className="p-4 flex flex-col gap-8">
      <AboutSection>
        <AboutMainTitle>{t("title", { brand })}</AboutMainTitle>
        <AboutText>
          <p>{t("intro", { brand })}</p>
          <p>{t("description", { brand })}</p>
          <p>{t("continuation", { brand })}</p>
        </AboutText>
      </AboutSection>
      <AboutSection>
        <AboutTitle>{t("BuiltWith.title")}</AboutTitle>
        <AboutText>
          <p>{t("BuiltWith.text", { brand })}</p>
        </AboutText>
      </AboutSection>
      <AboutSection>
        <AboutTitle>{t("Images.title")}</AboutTitle>
        <AboutText>
          <p>{t("Images.tools", { brand })}</p>
          <p>
            {t.rich("Images.terms", {
              link: (chunks) => <AboutLink url="/terms">{chunks}</AboutLink>,
            })}
          </p>
        </AboutText>
      </AboutSection>
      <AboutSection>
        <AboutTitle>{t("GetInTouch.title")}</AboutTitle>
        <AboutText>
          <p>{t("GetInTouch.text", { brand })}</p>
          <Anchor className="w-fit" href={`mailto:${t("GetInTouch.email")}`}>
            {t("GetInTouch.email")}
          </Anchor>
        </AboutText>
      </AboutSection>
    </main>
  );
}
