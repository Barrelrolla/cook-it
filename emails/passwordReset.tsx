import EmailBase, { EmailButton } from "./emailBase";
import { TranslatorType } from "@/constants";

export default function PasswordReset({
  t,
  url,
}: {
  t: TranslatorType;
  url: string;
}) {
  const title = t("Emails.password-reset-title", {
    brand: t("Global.brand-name"),
  });
  return (
    <EmailBase preview={title}>
      <h1 className="font-heading">{title}</h1>
      <p>{t("Emails.password-reset-message")}</p>
      <EmailButton url={url}>{t("Emails.password-reset-button")}</EmailButton>
    </EmailBase>
  );
}

PasswordReset.PreviewProps = {
  url: "#",
};
