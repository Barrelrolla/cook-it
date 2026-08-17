import { getSession } from "@/app/actions/authActions";
import SettingsBase from "../settingsBase";
import { redirect } from "next/navigation";
import AppearanceSettings from "./appearanceSettings";
import { formatSettingsCategory, SIGNIN_PARAM } from "@/constants";
import { getTranslations } from "next-intl/server";

export default async function AppearanceSettingsPage() {
  const session = await getSession();
  const tSettings = await getTranslations("Settings.Categories");
  const label = formatSettingsCategory(tSettings, "appearance");

  if (!session) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return (
    <SettingsBase label={label}>
      <AppearanceSettings />
    </SettingsBase>
  );
}
