import { redirect } from "next/navigation";
import { SIGNIN_PARAM, SOMETHING_WENT_WRONG } from "@/utils/constants";
import { getSession, getUserAuthMethods } from "@/app/actions/authActions";
import PasswordForm from "./passwordForm";

export default async function PasswordSettingsPage() {
  const session = await getSession();
  const authMethods = await getUserAuthMethods();

  if (!session || !session.user) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  if (!authMethods) {
    throw new Error(SOMETHING_WENT_WRONG);
  }

  return <PasswordForm hasPassword={authMethods.hasPassword} />;
}
