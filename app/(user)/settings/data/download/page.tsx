import { redirect } from "next/navigation";
import { getSession } from "@/app/actions/authActions";
import SettingsBase from "../../settingsBase";
import { SIGNIN_PARAM } from "@/constants";
import { getTranslations } from "next-intl/server";

export default async function DownloadDataage() {
  const session = await getSession();
  const t = await getTranslations("Settings.Data");

  if (!session || !session.user) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return (
    <SettingsBase showBack label={t("download-data")}>
      <p className="px-4">{t("Download.coming-soon")}</p>
    </SettingsBase>
  );
}
