import { getSession } from "@/app/actions/authActions";
import SettingsBase from "../settingsBase";
import { Input } from "@barrelrolla/react-components-library";
import { redirect } from "next/navigation";
import { SIGNIN_PARAM } from "@/utils/constants";

export default async function DataSettingsPage() {
  const session = await getSession();

  if (!session) {
    redirect(`/?${SIGNIN_PARAM}`);
  }

  return (
    <SettingsBase label="Data">
      <Input label="download" />
      <Input label="delete" color="error" />
    </SettingsBase>
  );
}
