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
      <div className="px-4">
        <p>Google</p>
        {hasGoogle && (
          <div>
            <p className="text-sm text-success-content">Connected</p>
            <UnlinkSocialButton social="google" />
          </div>
        )}
        {!hasGoogle && (
          <div className="w-fit">
            <SocialSigninButton social="google" />
          </div>
        )}
        <p className="mt-6">Apple</p>
        {hasApple && (
          <div>
            <p className="text-sm text-success-content">Connected</p>
            <UnlinkSocialButton social="apple" />
          </div>
        )}
        {!hasApple && (
          <div className="w-fit">
            <SocialSigninButton social="apple" />
          </div>
        )}
      </div>
    </SettingsBase>
  );
}
