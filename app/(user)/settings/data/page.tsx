import { getSession } from "@/app/actions/authActions";
import SettingsBase from "../settingsBase";
import { redirect } from "next/navigation";
import { SIGNIN_PARAM } from "@/utils/constants";
import SettingsLink from "../settingsLink";

export default async function DataSettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return (
    <SettingsBase label="Data">
      <SettingsLink label="Download your data" href="/settings/data/download" />
      <SettingsLink label="Delete your account" href="/settings/data/delete" />
    </SettingsBase>
  );
}
