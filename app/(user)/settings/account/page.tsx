import { getSession } from "@/app/actions/authActions";
import SettingsBase from "../settingsBase";
import SettingsLink from "../settingsLink";
import { redirect } from "next/navigation";
import { SIGNIN_PARAM } from "@/utils/constants";

export default async function AccountSettings() {
  const session = await getSession();

  if (!session) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return (
    <SettingsBase label="Account">
      <SettingsLink label="Password" href="/settings/account/password" />
      <SettingsLink label="Email" href="/settings/account/email" />
    </SettingsBase>
  );
}
