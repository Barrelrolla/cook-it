import { useTranslations } from "next-intl";
import EmailBase, { EmailButton } from "./emailBase";

type Props = {
  name: string;
  url: string;
};

export default function VerificationEmail({ name, url }: Props) {
  const tGlobal = useTranslations("Global");
  const brand = tGlobal("brand-name");
  const t = useTranslations("Emails");
  const title = t("welcome-title", { brand, name });
  return (
    <EmailBase preview={title}>
      <h1 className="font-heading">{title}</h1>
      <p>{t("welcome-message", { brand })}</p>
      <EmailButton url={url}>{t("verify-button")}</EmailButton>
    </EmailBase>
  );
}

VerificationEmail.PreviewProps = {
  name: "John Smith",
  url: "#",
};
