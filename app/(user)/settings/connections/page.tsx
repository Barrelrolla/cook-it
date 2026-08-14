import { getSession, getUserAuthMethods } from "@/app/actions/authActions";
import SettingsBase from "../settingsBase";
import { redirect } from "next/navigation";
import { SIGNIN_PARAM } from "@/utils/constants";
import SocialSigninButton from "@/app/components/authModal/socialSigninButton";
import UnlinkSocialButton from "./unlinkSocialButton";

export default async function ConnectionsSettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  const methods = await getUserAuthMethods();
  const hasGoogle = methods?.providers.includes("google");
  const hasApple = methods?.providers.includes("apple");

  return (
    <SettingsBase label="Connected services">
      <div className="px-4 w-70">
        <p>Google</p>
        {hasGoogle && (
          <div className="flex justify-between items-center">
            <p className="text-sm text-success">Connected</p>
            <UnlinkSocialButton social="google" />
          </div>
        )}
        {!hasGoogle && <SocialSigninButton social="google" />}
        <p className="mt-6">Apple</p>
        {hasApple && (
          <div>
            <p className="text-sm text-success">Connected</p>
            <UnlinkSocialButton social="apple" />
          </div>
        )}
        {!hasApple && <SocialSigninButton social="apple" />}
      </div>
    </SettingsBase>
  );
}
