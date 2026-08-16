import { getSession } from "@/app/actions/authActions";
import SettingsBase from "../settingsBase";
import SettingsLink from "../settingsLink";
import { redirect } from "next/navigation";
import { formatSettingsCategory, SIGNIN_PARAM } from "@/constants";
import { getTranslations } from "next-intl/server";

export default async function AccountSettings() {
  const session = await getSession();
  const label = await formatSettingsCategory("account");
  const t = await getTranslations("Settings.Account");

  if (!session) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return (
    <SettingsBase label={label}>
      <SettingsLink label={t("password")} href="/settings/account/password" />
      <SettingsLink label={t("email")} href="/settings/account/email" />
    </SettingsBase>
  );
}
