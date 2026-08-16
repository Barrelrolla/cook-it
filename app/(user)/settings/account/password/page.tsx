import { redirect } from "next/navigation";
import { getSession, getUserAuthMethods } from "@/app/actions/authActions";
import PasswordForm from "./passwordForm";
import { SIGNIN_PARAM } from "@/constants";
import { getTranslations } from "next-intl/server";

export default async function PasswordSettingsPage() {
  const t = await getTranslations("Global");
  const session = await getSession();
  const authMethods = await getUserAuthMethods();

  if (!session || !session.user) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  if (!authMethods) {
    throw new Error(t("something-went-wrong"));
  }

  return <PasswordForm hasPassword={authMethods.hasPassword} />;
}
