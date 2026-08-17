import EmailBase, { EmailButton } from "./emailBase";
import { TranslatorType } from "@/constants";

type Props = {
  t: TranslatorType;
  name: string;
  url: string;
};

export default function VerificationEmail({ t, name, url }: Props) {
  const brand = t("Global.brand-name");
  const title = t("Emails.welcome-title", { brand, name });
  return (
    <EmailBase preview={title}>
      <h1 className="font-heading">{title}</h1>
      <p>{t("Emails.welcome-message", { brand })}</p>
      <EmailButton url={url}>{t("Emails.verify-button")}</EmailButton>
    </EmailBase>
  );
}

VerificationEmail.PreviewProps = {
  name: "John Smith",
  url: "#",
};
