"use client";

import { useState, useTransition } from "react";
import { Input } from "@barrelrolla/react-components-library";
import { user as userSchema } from "@/db/schemas/auth-schema";
import { permissiveDisplayNameSchema } from "@/utils/validationSchemas";
import z from "zod";
import { authClient } from "@/auth/authClient";
import { useRouter } from "next/navigation";
import SettingsForm from "../../settingsForm";
import { useTranslations } from "next-intl";

export default function NameForm({
  user,
}: {
  user: typeof userSchema.$inferSelect;
}) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isChanged, setIsChanged] = useState(false);
  const router = useRouter();
  const tGlobal = useTranslations("Global");
  const tProfile = useTranslations("Settings.Profile");
  const t = useTranslations("Settings.Profile.Name");

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
      setIsChanged(true);
      router.refresh();
    } catch {
      throw new Error(tGlobal("something-went-wrong"));
    }
  }

  const handleFormAction = (formData: FormData) => {
    startTransition(async () => {
      await saveData(formData);
    });
  };

  return (
    <SettingsForm
      label={tProfile("name")}
      formAction={handleFormAction}
      isLoading={isPending}
      isActionDisabled={false}
      showBack
    >
      <p className="text-sm mb-6">{t("choose-name")}</p>
      <Input
        disabled={isPending}
        color={isChanged ? "success" : "primary"}
        id="name"
        name="name"
        tabIndex={0}
        onChange={() => {
          setIsChanged(false);
        }}
        error={nameError}
        defaultValue={name}
        autoComplete="name"
        label={t("display-name")}
        placeholder={user.name}
      />
      {isChanged && <p className="text-success text-sm">{t("name-changed")}</p>}
    </SettingsForm>
  );
}
