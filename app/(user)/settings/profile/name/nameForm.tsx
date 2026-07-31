"use client";

import { useState, useTransition } from "react";
import { Input } from "@barrelrolla/react-components-library";
import { user as userSchema } from "@/db/schemas/auth-schema";
import { permissiveDisplayNameSchema } from "@/utils/validationSchemas";
import z from "zod";
import { authClient } from "@/auth/authClient";
import { SOMETHING_WENT_WRONG } from "@/utils/constants";
import { useRouter } from "next/navigation";
import SettingsForm from "../../settingsForm";

export default function NameForm({
  user,
}: {
  user: typeof userSchema.$inferSelect;
}) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function saveData(formData: FormData) {
    const enteredName = formData.get("name")?.toString() || "";
    setNameError("");
    setName(enteredName);

    try {
      const Name = z.object({ name: permissiveDisplayNameSchema });
      const name = Name.safeParse({
        name: enteredName,
      });

      if (enteredName && name.error) {
        if (name.error.issues.length > 0) {
          setNameError(name.error.issues[0].message);
        } else {
          setNameError(name.error.message);
        }
        return;
      }

      if (name.data?.name) {
        await authClient.updateUser({
          name: name.data.name,
        });
      }

      setName("");
      router.refresh();
    } catch {
      throw new Error(SOMETHING_WENT_WRONG);
    }
  }

  const handleFormAction = (formData: FormData) => {
    startTransition(async () => {
      await saveData(formData);
    });
  };

  return (
    <SettingsForm
      label="Name"
      formAction={handleFormAction}
      isLoading={isPending}
    >
      <div className="flex mt-8">
        <Input
          disabled={isPending}
          id="name"
          name="name"
          tabIndex={0}
          defaultValue={name}
          autoComplete="name"
          label="Display name"
          placeholder={user.name}
        />
      </div>
      {nameError && <p className="text-error-content">{nameError}</p>}
    </SettingsForm>
  );
}
