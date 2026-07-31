import { redirect } from "next/navigation";
import { SIGNIN_PARAM } from "@/utils/constants";
import { getSession } from "@/app/actions/authActions";
import EmailForm from "./emailForm";

export default async function PasswordSettingsPage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return <EmailForm />;
}
