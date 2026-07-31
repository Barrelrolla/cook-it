import { getSession } from "@/app/actions/authActions";
import SettingsBase from "../settingsBase";
import SettingsLink from "../settingsLink";
import { redirect } from "next/navigation";
import { SIGNIN_PARAM } from "@/utils/constants";

export default async function ProfileSettings() {
  const session = await getSession();

  if (!session) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return (
    <SettingsBase label="Profile">
      <SettingsLink label="Profile picture" href="/settings/profile/picture" />
      <SettingsLink label="Name" href="/settings/profile/name" />
    </SettingsBase>
  );
}
