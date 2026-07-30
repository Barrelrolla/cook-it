"use client";
import { useTransition } from "react";
import SettingsBase from "../settingsBase";
import { Input } from "@barrelrolla/react-components-library";

export default function AppearanceSettingsPage() {
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
      label="Appearance"
      isLoading={isLoading}
    >
      <Input label="color theme" />
      <Input label="dark mode" />
    </SettingsBase>
  );
}
