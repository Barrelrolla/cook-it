import { getSession } from "@/app/actions/authActions";
import SettingsBase from "../settingsBase";
import { redirect } from "next/navigation";
import { SIGNIN_PARAM } from "@/utils/constants";
import AppearanceSettings from "./appearanceSettings";

export default async function AppearanceSettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return (
    <SettingsBase label="Appearance">
      <AppearanceSettings />
    </SettingsBase>
  );
}
