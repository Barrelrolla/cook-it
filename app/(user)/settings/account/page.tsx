"use client";
import { useTransition } from "react";
import SettingsBase from "../settingsBase";
import { Input } from "@barrelrolla/react-components-library";

export default function AccountSettingsPage() {
  const [isLoading, startTransition] = useTransition();

  async function saveData(formData: FormData) {
    console.log(formData);
  }

  function handleFormAction(formData: FormData) {
    startTransition(async () => {
      await saveData(formData);
    });
  }
  return (
    <SettingsBase
      formAction={handleFormAction}
      label="Account"
      isLoading={isLoading}
    >
      <Input label="password" />
      <Input label="email" />
    </SettingsBase>
  );
}
