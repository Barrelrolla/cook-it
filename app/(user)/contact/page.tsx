import { Anchor } from "barrelrolla-ui";
import { getTranslations } from "next-intl/server";
import ContactForm from "./contactForm";

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");
  return (
    <main className="p-4 flex flex-col gap-8">
      <h1 className="font-heading text-4xl">{t("title")}</h1>
      <div>
        <p>
          {t("text")}
          {": "}
          <Anchor href={`mailto:${t("email")}`}>{t("email")}</Anchor>
        </p>
        <p>{t("form")}</p>
      </div>
      <div className="w-full flex justify-center md:justify-start">
        <ContactForm />
      </div>
    </main>
  );
}
