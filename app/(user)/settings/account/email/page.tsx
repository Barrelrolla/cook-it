import { redirect } from "next/navigation";
import { SIGNIN_PARAM } from "@/utils/constants";
import { getSession } from "@/app/actions/authActions";
import { user } from "@/db/schemas/auth-schema";
import EmailForm from "./emailForm";

export default async function PasswordSettingsPage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return <EmailForm user={session.user as typeof user.$inferSelect} />;
}
