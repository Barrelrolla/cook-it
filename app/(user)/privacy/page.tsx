import { getTranslations } from "next-intl/server";
import AboutMainTitle from "../about/aboutMainTitle";
import AboutSection from "../about/aboutSection";
import AboutText from "../about/aboutText";
import AboutTitle from "../about/aboutTitle";
import { Anchor } from "barrelrolla-ui";
import PrivacySmallTitle from "./privacySmallTitle";

export default async function PrivacyPage() {
  const tGlobal = await getTranslations("Global");
  const brand = tGlobal("brand-name");
  const t = await getTranslations("PrivacyPage");
  const date = new Date(2026, 8, 1).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return (
    <main className="p-4 flex flex-col gap-8">
      <AboutSection>
        <AboutMainTitle>{t("title")}</AboutMainTitle>
        <AboutText>
          <p>{t("updated", { date })}</p>
          <p>{t("text", { brand })}</p>
        </AboutText>
      </AboutSection>
      <ol className="list-decimal ps-6 marker:font-heading marker:text-2xl flex flex-col gap-8">
        <li>
          <AboutSection>
            <AboutTitle>{t("WhoWeAre.title")}</AboutTitle>
            <AboutText>
              <p>{t("WhoWeAre.intro", { brand })}</p>
              <p>{t("WhoWeAre.gdpr")}</p>
              <p>{t("WhoWeAre.questions")}</p>
              <p>
                {t("email-label")}
                {": "}
                <Anchor href={`mailto:${t("email")}`}>{t("email")}</Anchor>
              </p>
            </AboutText>
          </AboutSection>
        </li>
        <li>
          <AboutSection>
            <AboutTitle>{t("Information.title")}</AboutTitle>
            <AboutText>
              <p>{t("Information.text", { brand })}</p>
              <PrivacySmallTitle>
                {t("Information.Account.title")}
              </PrivacySmallTitle>
              <p>{t("Information.Account.text", { brand })}</p>
              <ul className="list-disc list-inside">
                <li>{t("Information.Account.email")}</li>
                <li>{t("Information.Account.username")}</li>
                <li>{t("Information.Account.session")}</li>
              </ul>
              <p>{t("Information.Account.google", { brand })}</p>
              <p>{t("Information.Account.google-pass", { brand })}</p>
              <PrivacySmallTitle>
                {t("Information.Activity.title")}
              </PrivacySmallTitle>
              <p>{t("Information.Activity.text", { brand })}</p>
              <PrivacySmallTitle>
                {t("Information.Images.title")}
              </PrivacySmallTitle>
              <p>{t("Information.Images.intro", { brand })}</p>
              <p>{t("Information.Images.text", { brand })}</p>
              <p>{t("Information.Images.public")}</p>
            </AboutText>
            <PrivacySmallTitle>
              {t("Information.Analytics.title")}
            </PrivacySmallTitle>
            <p>{t("Information.Analytics.intro", { brand })}</p>
            <p>{t("Information.Analytics.text")}</p>
            <p>{t("Information.Analytics.advertising")}</p>
          </AboutSection>
        </li>
        <li>
          <AboutSection>
            <AboutTitle>{t("Cookies.title")}</AboutTitle>
            <AboutText>
              <p>{t("Cookies.text", { brand })}</p>

              <PrivacySmallTitle>
                {t("Cookies.Authentication.title")}
              </PrivacySmallTitle>
              <p>{t("Cookies.Authentication.text", { brand })}</p>

              <PrivacySmallTitle>{t("Cookies.Theme.title")}</PrivacySmallTitle>
              <p>{t("Cookies.Theme.text", { brand })}</p>

              <p>{t("Cookies.tracking")}</p>
            </AboutText>
          </AboutSection>
        </li>
        <li>
          <AboutSection>
            <AboutTitle>{t("Usage.title")}</AboutTitle>
            <AboutText>
              <p>{t("Usage.text")}</p>
              <ul className="list-disc list-inside">
                <li>{t("Usage.account")}</li>
                <li>{t("Usage.auth")}</li>
                <li>{t("Usage.features", { brand })}</li>
                <li>{t("Usage.content")}</li>
                <li>{t("Usage.saved")}</li>
                <li>{t("Usage.preferences")}</li>
                <li>{t("Usage.images")}</li>
                <li>{t("Usage.performance", { brand })}</li>
                <li>{t("Usage.security", { brand })}</li>
                <li>{t("Usage.communication")}</li>
                <li>{t("Usage.legal")}</li>
              </ul>
              <p>{t("Usage.selling")}</p>
              <p>{t("Usage.advertising")}</p>
            </AboutText>
          </AboutSection>
        </li>
        <li>
          <AboutSection>
            <AboutTitle>{t("LegalBases.title")}</AboutTitle>
            <AboutText>
              <p>{t("LegalBases.intro")}</p>
              <PrivacySmallTitle>
                {t("LegalBases.contract-title")}
              </PrivacySmallTitle>
              <p>{t("LegalBases.contract", { brand })}</p>
              <PrivacySmallTitle>
                {t("LegalBases.interests-title")}
              </PrivacySmallTitle>
              <p>{t("LegalBases.interests", { brand })}</p>
              <PrivacySmallTitle>
                {t("LegalBases.legal-title")}
              </PrivacySmallTitle>
              <p>{t("LegalBases.legal")}</p>
              <PrivacySmallTitle>
                {t("LegalBases.consent-title")}
              </PrivacySmallTitle>
              <p>{t("LegalBases.consent")}</p>
            </AboutText>
          </AboutSection>
        </li>
        <li>
          <AboutSection>
            <AboutTitle>{t("ThirdParties.title")}</AboutTitle>
            <AboutText>
              <p>{t("ThirdParties.intro", { brand })}</p>
              <ul className="list-disc list-inside">
                <li>{t("ThirdParties.vercel")}</li>
                <li>{t("ThirdParties.neon")}</li>
                <li>{t("ThirdParties.better-auth")}</li>
                <li>{t("ThirdParties.google")}</li>
                <li>{t("ThirdParties.cloudinary")}</li>
                <li>{t("ThirdParties.resend")}</li>
              </ul>
              <p>{t("ThirdParties.text")}</p>
            </AboutText>
          </AboutSection>
        </li>
        <li>
          <AboutSection>
            <AboutTitle>{t("Retention.title")}</AboutTitle>
            <AboutText>
              <p>{t("Retention.account", { brand })}</p>
              <p>{t("Retention.deletion")}</p>
              <p>{t("Retention.technical")}</p>
            </AboutText>
          </AboutSection>
        </li>
        <li>
          <AboutSection>
            <AboutTitle>{t("Rights.title")}</AboutTitle>
            <AboutText>
              <p>{t("Rights.intro")}</p>
              <ul className="list-disc list-inside">
                <li>{t("Rights.access")}</li>
                <li>{t("Rights.rectification")}</li>
                <li>{t("Rights.erasure")}</li>
                <li>{t("Rights.restriction")}</li>
                <li>{t("Rights.portability")}</li>
                <li>{t("Rights.object")}</li>
                <li>{t("Rights.withdraw")}</li>
              </ul>
              <p>
                {t("Rights.exercise")}
                {": "}
                <Anchor href={`mailto:${t("email")}`}>{t("email")}</Anchor>
              </p>
              <p>{t("Rights.verification")}</p>
              <p>{t("Rights.complaint")}</p>
            </AboutText>
          </AboutSection>
        </li>
        <li>
          <AboutSection>
            <AboutTitle>{t("Security.title")}</AboutTitle>
            <AboutText>
              <p>{t("Security.text")}</p>
              <p>{t("Security.disclaimer")}</p>
            </AboutText>
          </AboutSection>
        </li>
        <li>
          <AboutSection>
            <AboutTitle>{t("Children.title")}</AboutTitle>
            <AboutText>
              <p>{t("Children.text", { brand })}</p>
              <p>{t("Children.collection", { brand })}</p>
            </AboutText>
          </AboutSection>
        </li>
        <li>
          <AboutSection>
            <AboutTitle>{t("Transfers.title")}</AboutTitle>
            <AboutText>
              <p>{t("Transfers.text", { brand })}</p>
              <p>{t("Transfers.safeguards")}</p>
            </AboutText>
          </AboutSection>
        </li>
        <li>
          <AboutSection>
            <AboutTitle>{t("Changes.title")}</AboutTitle>
            <AboutText>
              <p>{t("Changes.text", { brand })}</p>
              <p>{t("Changes.date")}</p>
            </AboutText>
          </AboutSection>
        </li>
        <li>
          <AboutSection>
            <AboutTitle>{t("Contact.title")}</AboutTitle>
            <AboutText>
              <p>{t("Contact.text")}</p>
              <p>{t("Contact.name")}</p>
              <p>
                <Anchor href={`mailto:${t("email")}`}>{t("email")}</Anchor>
              </p>
            </AboutText>
          </AboutSection>
        </li>
      </ol>
    </main>
  );
}
