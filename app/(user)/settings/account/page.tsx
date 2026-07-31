import SettingsBase from "../settingsBase";
import SettingsLink from "../settingsLink";

export default function AccountSettings() {
  return (
    <SettingsBase label="Account">
      <SettingsLink label="Password" href="/settings/account/password" />
      <SettingsLink label="Email" href="/settings/account/email" />
    </SettingsBase>
  );
}
