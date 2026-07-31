import { getSession } from "@/app/actions/authActions";
import { user } from "@/db/schemas/auth-schema";
import ProfilePictureForm from "./profilePictureForm";
import { redirect } from "next/navigation";
import { SIGNIN_PARAM } from "@/utils/constants";

export default async function PictureSettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return <ProfilePictureForm user={session.user as typeof user.$inferSelect} />;
}
