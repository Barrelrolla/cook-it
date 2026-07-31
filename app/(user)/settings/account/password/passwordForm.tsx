"use client";

import { useState, useTransition } from "react";
import { Input } from "@barrelrolla/react-components-library";
import SettingsForm from "../../settingsForm";
import { PasswordInputSchema } from "@/utils/validationSchemas";
import { authClient } from "@/auth/authClient";
import { setPassword } from "@/app/actions/authActions";
import { SOMETHING_WENT_WRONG } from "@/utils/constants";
import { $ZodIssue } from "zod/v4/core";

export default function PasswordForm({
  hasPassword,
}: {
  hasPassword: boolean;
}) {
  const [hasPass, setHasPass] = useState(hasPassword);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [issue, setIssue] = useState<$ZodIssue | undefined>(undefined);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [wasChanged, setWasChanged] = useState(false);

  async function saveData(formData: FormData) {
    const enteredOldPass = formData.get("old-password")?.toString() || "";
    setOldPassword(enteredOldPass);
    const enteredNewPass = formData.get("new-password")?.toString() || "";
    setNewPassword(enteredNewPass);
    const enteredRepeatPass = formData.get("repeat-password")?.toString() || "";
    setRepeatPassword(enteredRepeatPass);
    setIssue(undefined);
    setError("");

    const pass = PasswordInputSchema.safeParse({
      password: enteredNewPass,
      repeatPassword: enteredRepeatPass,
    });

    console.log("gggm");
    if (pass.error) {
      if (pass.error.issues.length > 0) {
        setIssue(pass.error.issues[0]);
      } else {
        setError(pass.error.message);
      }
      return;
    }

    if (hasPass && pass.data) {
      authClient.changePassword(
        {
          currentPassword: enteredOldPass,
          newPassword: pass.data.password,
        },
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
      return;
    }

    if (!hasPass && pass.data) {
      try {
        await setPassword(pass.data.password);
      } catch {
        setError(SOMETHING_WENT_WRONG);
        return;
      }
      setHasPass(true);
    }

    setError("");
    setIssue(undefined);
    setWasChanged(true);
  }

  const handleFormAction = (formData: FormData) => {
    startTransition(async () => {
      await saveData(formData);
    });
  };

  return (
    <SettingsForm
      label={"Password"}
      formAction={handleFormAction}
      isLoading={isPending || isLoading}
    >
      <p className="text-sm mb-6">
        {hasPass ? "Change password" : "Set a password"}
      </p>
      {hasPass && (
        <Input
          type="password"
          disabled={wasChanged || isLoading || isPending}
          defaultValue={oldPassword}
          name="old-password"
          label="Old password"
          autoComplete="current-password"
        />
      )}
      <Input
        type="password"
        disabled={wasChanged || isLoading || isPending}
        defaultValue={newPassword}
        name="new-password"
        label="New Password"
        autoComplete="new-password"
        error={issue && issue.path[0] === "password" ? issue.message : ""}
      />
      <Input
        type="password"
        disabled={wasChanged || isLoading || isPending}
        defaultValue={repeatPassword}
        name="repeat-password"
        label="Repeat Password"
        error={
          issue && issue.path[0] === "repeat-password" ? issue.message : ""
        }
      />
      {error && <p className="text-error-content text-sm">{error}</p>}
      {wasChanged && (
        <p className="text-success-content text-sm">
          {hasPass ? "Password changed" : "Password set"}
        </p>
      )}
    </SettingsForm>
  );
}
