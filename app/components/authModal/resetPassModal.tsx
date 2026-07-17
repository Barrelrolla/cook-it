"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import z from "zod";
import { ZodIssue } from "zod/v3";
import { authClient } from "@/auth/authClient";
import { RESET_PASSWORD_PARAM, SOMETHING_WENT_WRONG } from "@/utils/constants";
import { passwordSchema } from "@/utils/validationSchemas";
import BaseModal from "../baseModal";
import {
  Button,
  CardActions,
  Input,
} from "@barrelrolla/react-components-library";
import { PiCheckBold, PiKeyBold } from "react-icons/pi";

export default function ResetPasswordModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [issue, setIssue] = useState<ZodIssue | undefined>(undefined);
  const [passwordReset, setPasswordReset] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const passwordResetFormRef = useRef<HTMLFormElement>(null);
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const showResetPass = searchParams.has(RESET_PASSWORD_PARAM);

  function formAction(formData: FormData) {
    const pass = formData.get("password")?.toString() || "";
    setPassword(pass);
    const repeatPass = formData.get("repeat-password")?.toString() || "";
    setRepeatPassword(repeatPass);

    const Pass = z
      .object({ password: passwordSchema, repeatPassword: z.string() })
      .refine((data) => data.password === data.repeatPassword, {
        path: ["repeat-password"],
        message: "Passwords do not match.",
      });

    const parsedPass = Pass.safeParse({
      password: pass,
      repeatPassword: repeatPass,
    });

    if (!parsedPass.data) {
      if (parsedPass.error.issues.length > 0) {
        setIssue(parsedPass.error.issues[0] as ZodIssue);
      } else {
        setError(SOMETHING_WENT_WRONG);
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
          setError(ctx.error.message || SOMETHING_WENT_WRONG);
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
      title="Reset Password"
      formRef={passwordResetFormRef}
      formAction={formAction}
      isOpen={showResetPass}
      setIsOpen={close}
    >
      <Input
        required
        disabled={passwordReset}
        startIcon={<PiKeyBold />}
        aria-label="password"
        type="password"
        placeholder="password"
        id="password"
        name="password"
        autoComplete={"new-password"}
        defaultValue={password}
        error={
          issue && issue.path.length > 0 && issue.path[0] === "password"
            ? issue.message
            : undefined
        }
      />
      <Input
        required
        disabled={passwordReset}
        startIcon={<PiKeyBold />}
        aria-label="repeat password"
        type="password"
        placeholder="repeat password"
        id="repeat-password"
        name="repeat-password"
        autoComplete={"new-password"}
        defaultValue={repeatPassword}
        error={
          issue && issue.path.length > 0 && issue.path[0] === "repeat-password"
            ? issue.message
            : undefined
        }
      />
      {error && <p className="mt-1 text-center text-error-content">{error}</p>}
      {passwordReset && (
        <p className="flex place-self-center mt-1 items-center text-success-content">
          Password changed! <PiCheckBold className="ml-2" />
        </p>
      )}
      <CardActions className="w-full p-0 mt-2 flex flex-col gap-2">
        <Button
          wrapperClasses="flex-1"
          className="w-full"
          size="sm"
          type="submit"
          loading={isLoading}
          disabled={passwordReset}
        >
          Update password
        </Button>
      </CardActions>
    </BaseModal>
  );
}
