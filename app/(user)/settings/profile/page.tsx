import SettingsBase from "../settingsBase";
import SettingsLink from "../settingsLink";

export default function ProfileSettings() {
  return (
    <SettingsBase label="Profile">
      <SettingsLink label="Profile picture" href="/settings/profile/picture" />
      <SettingsLink label="Name" href="/settings/profile/name" />
    </SettingsBase>
  );
}
