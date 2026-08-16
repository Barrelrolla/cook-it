import { useTranslations } from "next-intl";
import EmailBase, { EmailButton } from "./emailBase";

export default function DeleteAccount({
  user,
  url,
}: {
  user: string;
  url: string;
}) {
  const tGlobal = useTranslations("Global");
  const t = useTranslations("Emails");
  const title = t("delete-title", { brand: tGlobal("brand-name") });
  return (
    <EmailBase preview={title}>
      <h1 className="font-heading">{title}</h1>
      <p>{t("delete-message", { name: user })}</p>
      <EmailButton color="error" url={url}>
        {t("delete-button")}
      </EmailButton>
    </EmailBase>
  );
}

DeleteAccount.PreviewProps = {
  name: "John doe",
  url: "#",
};
