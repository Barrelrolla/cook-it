"use client";
import { useTransition } from "react";
import SettingsBase from "../settingsBase";
import { Input } from "@barrelrolla/react-components-library";

export default function DataSettingsPage() {
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
      label="Data"
      isLoading={isLoading}
    >
      <Input label="download" />
      <Input label="delete" color="error" />
    </SettingsBase>
  );
}
