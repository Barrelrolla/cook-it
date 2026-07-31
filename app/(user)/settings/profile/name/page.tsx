import { redirect } from "next/navigation";
import { SIGNIN_PARAM } from "@/utils/constants";
import { getSession } from "@/app/actions/authActions";
import { user } from "@/db/schemas/auth-schema";
import NameForm from "./nameForm";

export default async function NameSettingsPage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return <NameForm user={session.user as typeof user.$inferSelect} />;
}
