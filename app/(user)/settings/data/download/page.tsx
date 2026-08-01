import { redirect } from "next/navigation";
import { SIGNIN_PARAM } from "@/utils/constants";
import { getSession } from "@/app/actions/authActions";
import SettingsBase from "../../settingsBase";

export default async function DownloadDataage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return (
    <SettingsBase showBack label="Download your data">
      <p className="px-4">Coming soon</p>
    </SettingsBase>
  );
}
