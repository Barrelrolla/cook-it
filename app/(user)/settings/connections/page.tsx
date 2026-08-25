import { getSession, getUserAuthMethods } from "@/app/actions/authActions";
import { redirect } from "next/navigation";
import { formatSettingsCategory, SIGNIN_PARAM } from "@/constants";
import SettingsBase from "../settingsBase";
import SocialSigninButton from "@/app/components/authModal/socialSigninButton";
import UnlinkSocialButton from "./unlinkSocialButton";
import { getTranslations } from "next-intl/server";

export default async function ConnectionsSettingsPage() {
  const session = await getSession();
  const tSettings = await getTranslations("Settings.Categories");
  const label = formatSettingsCategory(tSettings, "connections");
  const tGlobal = await getTranslations("Global");
  const t = await getTranslations("Settings.Connections");

  if (!session) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  const methods = await getUserAuthMethods();
  const hasGoogle = methods?.providers.includes("google");
  // const hasApple = methods?.providers.includes("apple");

  return (
    <SettingsBase label={label}>
      <div className="px-4 w-70">
        <p>{tGlobal("google")}</p>
        {hasGoogle && (
          <div className="flex justify-between items-center">
            <p className="text-sm text-success">{t("connected")}</p>
            <UnlinkSocialButton social="google" />
          </div>
        )}
        {!hasGoogle && <SocialSigninButton social="google" />}
        <p className="mt-6">{tGlobal("apple")}</p>
        {/* {hasApple && (
          <div>
            <p className="text-sm text-success">{t("connected")}</p>
            <UnlinkSocialButton social="apple" />
          </div>
        )}
        {!hasApple && <SocialSigninButton social="apple" />} */}
      </div>
    </SettingsBase>
  );
}
