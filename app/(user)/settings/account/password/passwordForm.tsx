"use client";

import { useTransition } from "react";
import { Input } from "@barrelrolla/react-components-library";
import { user as userSchema } from "@/db/schemas/auth-schema";
import { useRouter } from "next/navigation";
import SettingsForm from "../../settingsForm";

export default function PasswordForm({
  user,
}: {
  user: typeof userSchema.$inferSelect;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function saveData(formData: FormData) {}

  const handleFormAction = (formData: FormData) => {
    startTransition(async () => {
      await saveData(formData);
    });
  };

  return (
    <SettingsForm
      label="Password"
      formAction={handleFormAction}
      isLoading={isPending}
    >
      <Input name="password" />
    </SettingsForm>
  );
}
