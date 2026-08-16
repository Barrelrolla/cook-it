import { redirect } from "next/navigation";
import { getSession } from "@/app/actions/authActions";
import SettingsBase from "../../settingsBase";
import DeleteAccountButton from "./deleteAccountButton";
import { SIGNIN_PARAM } from "@/constants";
import { getTranslations } from "next-intl/server";

export default async function DeleteAccountPage() {
  const session = await getSession();
  const t = await getTranslations("Settings.Data");

  if (!session || !session.user) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return (
    <SettingsBase showBack label={t("delete-account")}>
      <div className="px-4">
        <DeleteAccountButton />
      </div>
    </SettingsBase>
  );
}
