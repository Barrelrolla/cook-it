import { getTranslations } from "next-intl/server";
import TermsSection from "./termsSection";
import TermsMainTitle from "./termsMainTitle";
import TermsText from "./termsText";
import TermsTitle from "./termsTitle";
import { Anchor } from "@barrelrolla/react-components-library";

export default async function TermsPage() {
  const tGlobal = await getTranslations("Global");
  const brand = tGlobal("brand-name");
  const t = await getTranslations("TermsPage");
  const date = new Date(2026, 8, 1).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <main className="p-4 flex flex-col gap-8">
      <TermsSection>
        <TermsMainTitle>{t("title")}</TermsMainTitle>
        <TermsText>
          <p>{t("updated", { date })}</p>
          <p>{t("intro", { brand })}</p>
          <p>{t("text", { brand })}</p>
        </TermsText>
      </TermsSection>
      <ol className="list-decimal ps-6 marker:font-heading marker:text-2xl flex flex-col gap-8">
        <li>
          <TermsSection>
            <TermsTitle>{t("About.title", { brand })}</TermsTitle>
            <p>{t("About.operated", { brand })}</p>
            <p>{t("About.text", { brand })}</p>
          </TermsSection>
        </li>
        <li>
          <TermsSection>
            <TermsTitle>{t("YourAccount.title")}</TermsTitle>
            <p>{t("YourAccount.features", { brand })}</p>
            <p>{t("YourAccount.responsible")}</p>
            <ul className="list-disc list-inside">
              <li>{t("YourAccount.information")}</li>
              <li>{t("YourAccount.credentials")}</li>
              <li>{t("YourAccount.activity")}</li>
              <li>{t("YourAccount.sharing")}</li>
            </ul>
            <p>{t("YourAccount.google")}</p>
            <p>{t("YourAccount.deletion")}</p>
          </TermsSection>
        </li>
        <li>
          <TermsSection>
            <TermsTitle>{t("UserContent.title")}</TermsTitle>
            <p>{t("UserContent.intro", { brand })}</p>
            <p>{t("UserContent.ownership")}</p>
            <p>{t("UserContent.license", { brand })}</p>
            <p>{t("UserContent.transfer", { brand })}</p>
            <p>{t("UserContent.responsible")}</p>
            <p>{t("UserContent.must-not")}</p>
            <ul className="list-disc list-inside">
              <li>{t("UserContent.infringe")}</li>
              <li>{t("UserContent.personal")}</li>
              <li>{t("UserContent.illegal")}</li>
              <li>{t("UserContent.malicious", { brand })}</li>
              <li>{t("UserContent.laws")}</li>
            </ul>
            <p>{t("UserContent.public", { brand })}</p>
          </TermsSection>
        </li>
        <li>
          <TermsSection>
            <TermsTitle>{t("ContentRemoval.title")}</TermsTitle>
            <p>{t("ContentRemoval.text", { brand })}</p>
            <p>{t("ContentRemoval.termination", { brand })}</p>
            <p>{t("ContentRemoval.monitor")}</p>
          </TermsSection>
        </li>
        <li>
          <TermsSection>
            <TermsTitle>{t("RecipeSafety.title")}</TermsTitle>
            <p>{t("RecipeSafety.intro", { brand })}</p>
            <p>{t("RecipeSafety.accuracy", { brand })}</p>
            <p>{t("RecipeSafety.risks")}</p>
            <p>{t("RecipeSafety.responsibility")}</p>
            <p>{t("RecipeSafety.health")}</p>
            <p>{t("RecipeSafety.advice", { brand })}</p>
          </TermsSection>
        </li>
        <li>
          <TermsSection>
            <TermsTitle>{t("IntellectualProperty.title")}</TermsTitle>
            <p>{t("IntellectualProperty.platform", { brand })}</p>
            <p>{t("IntellectualProperty.use", { brand })}</p>
            <p>{t("IntellectualProperty.user-content")}</p>
          </TermsSection>
        </li>
        <li>
          <TermsSection>
            <TermsTitle>{t("ThirdParties.title")}</TermsTitle>
            <p>{t("ThirdParties.text", { brand })}</p>
            <p>{t("ThirdParties.availability", { brand })}</p>
            <p>{t("ThirdParties.terms")}</p>
          </TermsSection>
        </li>
        <li>
          <TermsSection>
            <TermsTitle>{t("Availability.title")}</TermsTitle>
            <p>{t("Availability.availability", { brand })}</p>
            <p>{t("Availability.modify", { brand })}</p>
            <p>{t("Availability.features", { brand })}</p>
          </TermsSection>
        </li>
        <li>
          <TermsSection>
            <TermsTitle>{t("Disclaimer.title")}</TermsTitle>
            <p>{t("Disclaimer.text", { brand })}</p>
            <p>{t("Disclaimer.warranties", { brand })}</p>
            <p>{t("Disclaimer.content")}</p>
          </TermsSection>
        </li>
        <li>
          <TermsSection>
            <TermsTitle>{t("Liability.title")}</TermsTitle>
            <p>{t("Liability.text", { brand })}</p>
            <p>{t("Liability.examples", { brand })}</p>
            <p>{t("Liability.legal")}</p>
          </TermsSection>
        </li>
        <li>
          <TermsSection>
            <TermsTitle>{t("Indemnification.title")}</TermsTitle>
            <p>{t("Indemnification.text")}</p>
          </TermsSection>
        </li>
        <li>
          <TermsSection>
            <TermsTitle>{t("Termination.title")}</TermsTitle>
            <p>{t("Termination.user", { brand })}</p>
            <p>{t("Termination.us", { brand })}</p>
            <p>{t("Termination.notice")}</p>
            <p>{t("Termination.survival")}</p>
          </TermsSection>
        </li>
        <li>
          <TermsSection>
            <TermsTitle>{t("Changes.title")}</TermsTitle>
            <p>{t("Changes.text")}</p>
            <p>{t("Changes.material")}</p>
            <p>{t("Changes.acceptance", { brand })}</p>
          </TermsSection>
        </li>
        <li>
          <TermsSection>
            <TermsTitle>{t("GoverningLaw.title")}</TermsTitle>
            <p>{t("GoverningLaw.text")}</p>
            <p>{t("GoverningLaw.rights")}</p>
          </TermsSection>
        </li>
        <li>
          <TermsSection>
            <TermsTitle>{t("Contact.title")}</TermsTitle>
            <p>{t("Contact.text")}</p>
            <p>{t("Contact.name")}</p>
            <p>
              <Anchor href={`mailto:${t("Contact.email")}`}>
                {t("Contact.email")}
              </Anchor>
            </p>
          </TermsSection>
        </li>
      </ol>
    </main>
  );
}
