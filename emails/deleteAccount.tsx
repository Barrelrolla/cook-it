import EmailBase, { EmailButton } from "./emailBase";
import { TranslatorType } from "@/constants";

export default function DeleteAccount({
  t,
  user,
  url,
}: {
  t: TranslatorType;
  user: string;
  url: string;
}) {
  const title = t("Emails.delete-title", { brand: t("Global.brand-name") });
  return (
    <EmailBase preview={title}>
      <h1 className="font-heading">{title}</h1>
      <p>{t("Emails.delete-message", { name: user })}</p>
      <EmailButton color="error" url={url}>
        {t("Emails.delete-button")}
      </EmailButton>
    </EmailBase>
  );
}

DeleteAccount.PreviewProps = {
  name: "John doe",
  url: "#",
};
