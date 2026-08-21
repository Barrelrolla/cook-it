import { getSession } from "@/app/actions/authActions";
import ProfilePictureForm from "./profilePictureForm";
import { redirect } from "next/navigation";
import { SIGNIN_PARAM } from "@/constants";

export default async function PictureSettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  const user = JSON.parse(JSON.stringify(session.user));

  return <ProfilePictureForm user={user} />;
}
