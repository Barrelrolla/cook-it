import { getSession } from "@/app/actions/authActions";
import SettingsBase from "../settingsBase";
import { redirect } from "next/navigation";
import SettingsLink from "../settingsLink";
import { formatSettingsCategory, SIGNIN_PARAM } from "@/constants";
import { getTranslations } from "next-intl/server";

export default async function DataSettingsPage() {
  const session = await getSession();
  const tSettings = await getTranslations("Settings.Categories");
  const label = formatSettingsCategory(tSettings, "data");
  const t = await getTranslations("Settings.Data");

  if (!session) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return (
    <SettingsBase label={label}>
      <SettingsLink label={t("download-data")} href="/settings/data/download" />
      <SettingsLink label={t("delete-account")} href="/settings/data/delete" />
    </SettingsBase>
  );
}
