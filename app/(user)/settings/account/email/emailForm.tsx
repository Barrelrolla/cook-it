"use client";

import { useState } from "react";
import z from "zod";
import { Input } from "@barrelrolla/react-components-library";
import { authClient } from "@/auth/authClient";
import SettingsForm from "../../settingsForm";
import { useTranslations } from "next-intl";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wasChanged, setWasChanged] = useState(false);
  const tAcc = useTranslations("Settings.Account");
  const t = useTranslations("Settings.Account.Email");

  async function requestEmailChange(formData: FormData) {
    const enteredEmail = formData.get("email")?.toString() || "";
    setEmail(enteredEmail);
    setError("");

    const Email = z.email(enteredEmail);
    const parsedEmail = Email.safeParse(enteredEmail);
    if (parsedEmail.error) {
      if (parsedEmail.error.issues.length > 0) {
        setError(parsedEmail.error.issues[0].message);
      } else {
        setError(parsedEmail.error.message);
      }
      return;
    }

    authClient.changeEmail(
      { newEmail: parsedEmail.data, callbackURL: "/" },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          setWasChanged(true);
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setIsLoading(false);
        },
      },
    );
  }

  return (
    <SettingsForm
      label={tAcc("email")}
      formAction={requestEmailChange}
      isLoading={isLoading}
      isActionDisabled={wasChanged}
      showBack
    >
      <p className="text-sm mb-6">{t("description")}</p>
      <Input
        required
        disabled={isLoading || wasChanged}
        defaultValue={email}
        name="email"
        label={t("new-email")}
        type="email"
        autoComplete="email"
        error={error}
      />
      {wasChanged && (
        <p className="text-sm text-success">{t("confirmation-email-sent")}</p>
      )}
    </SettingsForm>
  );
}
