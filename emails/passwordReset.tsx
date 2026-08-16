import { useTranslations } from "next-intl";
import EmailBase, { EmailButton } from "./emailBase";

export default function PasswordReset({ url }: { url: string }) {
  const tGlobal = useTranslations("Global");
  const t = useTranslations("Emails");
  const title = t("password-reset-title", { name: tGlobal("brand-name") });
  return (
    <EmailBase preview={title}>
      <h1 className="font-heading">{title}</h1>
      <p>{t("password-reset-message")}</p>
      <EmailButton url={url}>{t("password-reset-button")}</EmailButton>
    </EmailBase>
  );
}

PasswordReset.PreviewProps = {
  url: "#",
};
