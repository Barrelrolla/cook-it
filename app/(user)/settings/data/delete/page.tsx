import { redirect } from "next/navigation";
import { SIGNIN_PARAM } from "@/utils/constants";
import { getSession } from "@/app/actions/authActions";
import SettingsBase from "../../settingsBase";
import DeleteAccountButton from "./deleteAccountButton";

export default async function DeleteAccountPage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return (
    <SettingsBase showBack label="Delete your account">
      <div className="px-4">
        <DeleteAccountButton />
      </div>
    </SettingsBase>
  );
}
