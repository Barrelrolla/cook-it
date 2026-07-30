"use client";
import { useTransition } from "react";
import SettingsBase from "../settingsBase2";
import { Input } from "@barrelrolla/react-components-library";

export default function ConnectionsSettingsPage() {
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
      label="Connected services"
      isLoading={isLoading}
    >
      <Input label="google" />
      <Input label="apple" />
    </SettingsBase>
  );
}
