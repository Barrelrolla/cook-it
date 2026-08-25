"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/auth/authClient";
import { RESET_PASSWORD_PARAM } from "@/constants";
import { createPasswordInputValidation } from "@/utils/validationSchemas";
import BaseModal from "../baseModal";
import {
  Button,
  CardActions,
  Input,
} from "@barrelrolla/react-components-library";
import { PiCheckBold, PiKeyBold } from "react-icons/pi";
import { $ZodIssue } from "zod/v4/core";
import { useTranslations } from "next-intl";

export default function ResetPasswordModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [issue, setIssue] = useState<$ZodIssue | undefined>(undefined);
  const [passwordReset, setPasswordReset] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const passwordResetFormRef = useRef<HTMLFormElement>(null);
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const showResetPass = searchParams.has(RESET_PASSWORD_PARAM);
  const tGlobal = useTranslations("Global");
  const t = useTranslations("AuthModal");
  const tValidation = useTranslations("Validation");

  function formAction(formData: FormData) {
    const pass = formData.get("password")?.toString() || "";
    setPassword(pass);
    const repeatPass = formData.get("repeat-password")?.toString() || "";
    setRepeatPassword(repeatPass);

    const parsedPass = createPasswordInputValidation(tValidation).safeParse({
      password: pass,
      repeatPassword: repeatPass,
    });

    if (!parsedPass.data) {
      if (parsedPass.error.issues.length > 0) {
        setIssue(parsedPass.error.issues[0]);
      } else {
        setError(tGlobal("something-went-wrong"));
      }
      return;
    }

    authClient.resetPassword(
      {
        newPassword: parsedPass.data.password,
        token: searchParams.get("token") || undefined,
      },
      {
        onRequest: () => {
          setError("");
          setIssue(undefined);
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          setPasswordReset(true);
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(ctx.error.message || tGlobal("something-went-wrong"));
        },
      },
    );
  }

  function reset() {
    setIsLoading(false);
    setError("");
    setIssue(undefined);
    setPasswordReset(false);
    setPassword("");
    setRepeatPassword("");
    passwordResetFormRef.current?.reset();
  }

  function close() {
    reset();
    const params = new URLSearchParams(searchParams.toString());
    params.delete(RESET_PASSWORD_PARAM);
    params.delete("token");
    const query = params.toString();
    router.replace(query ? `${path}?${query}` : path, { scroll: false });
  }

  return (
    <BaseModal
      closeLabel={t("close")}
      title={t("reset-password-title")}
      formRef={passwordResetFormRef}
      formAction={formAction}
      isOpen={showResetPass}
      setIsOpen={close}
    >
      <Input
        wrapperClassName="w-full"
        required
        disabled={passwordReset}
        startIcon={<PiKeyBold />}
        aria-label={t("new-password-input-label")}
        revealPasswordToggleAriaLabel={t("reveal-password")}
        type="password"
        placeholder={t("new-password-input-label")}
        id="password"
        name="password"
        autoComplete="new-password"
        defaultValue={password}
        error={
          issue && issue.path.length > 0 && issue.path[0] === "password"
            ? issue.message
            : undefined
        }
      />
      <Input
        wrapperClassName="w-full"
        required
        disabled={passwordReset}
        startIcon={<PiKeyBold />}
        aria-label={t("repeat-password-input-label")}
        revealPasswordToggleAriaLabel={t("reveal-password")}
        type="password"
        placeholder={t("repeat-password-input-label")}
        id="repeat-password"
        name="repeat-password"
        defaultValue={repeatPassword}
        error={
          issue && issue.path.length > 0 && issue.path[0] === "repeat-password"
            ? issue.message
            : undefined
        }
      />
      {error && <p className="mt-1 text-center text-error">{error}</p>}
      {passwordReset && (
        <p className="flex place-self-center mt-1 items-center text-success">
          {t("password-changed-message")}
          <PiCheckBold className="ml-2" />
        </p>
      )}
      <CardActions className="w-full p-0 mt-2 flex flex-col gap-2">
        <Button
          wrapperClassName="flex-1"
          className="w-full"
          size="sm"
          type="submit"
          loading={isLoading}
          disabled={passwordReset}
        >
          {t("update-password-button")}
        </Button>
      </CardActions>
    </BaseModal>
  );
}
