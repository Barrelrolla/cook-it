import { redirect } from "next/navigation";
import { SIGNIN_PARAM } from "@/constants";
import { getSession } from "@/app/actions/authActions";
import NameForm from "./nameForm";

export default async function NameSettingsPage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  const user = JSON.parse(JSON.stringify(session.user));

  return <NameForm user={user} />;
}
