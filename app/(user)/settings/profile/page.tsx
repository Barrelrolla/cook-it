import { getSession } from "@/app/actions/authActions";
import SettingsBase from "../settingsBase";
import SettingsLink from "../settingsLink";
import { redirect } from "next/navigation";
import { formatSettingsCategory, SIGNIN_PARAM } from "@/constants";
import { getTranslations } from "next-intl/server";

export default async function ProfileSettings() {
  const session = await getSession();
  const tSettings = await getTranslations("Settings.Categories");
  const label = formatSettingsCategory(tSettings, "profile");
  const t = await getTranslations("Settings.Profile");

  if (!session) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return (
    <SettingsBase label={label}>
      <SettingsLink label={t("picture")} href="/settings/profile/picture" />
      <SettingsLink label={t("name")} href="/settings/profile/name" />
    </SettingsBase>
  );
}
