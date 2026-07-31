"use client";

import { useState } from "react";
import { Input } from "@barrelrolla/react-components-library";
import SettingsForm from "../../settingsForm";
import z from "zod";
import { authClient } from "@/auth/authClient";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wasChanged, setWasChanged] = useState(false);

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
      label="Email"
      formAction={requestEmailChange}
      isLoading={isLoading}
      isActionDisabled={wasChanged}
    >
      <p className="text-sm mb-6">Change your email</p>
      <Input
        required
        disabled={isLoading || wasChanged}
        defaultValue={email}
        name="email"
        label="New email"
        type="email"
        autoComplete="email"
        error={error}
      />
      {wasChanged && (
        <p className="text-sm text-success-content">Confirmation email sent!</p>
      )}
    </SettingsForm>
  );
}
