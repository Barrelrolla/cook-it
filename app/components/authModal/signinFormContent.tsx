import { useRef, useState } from "react";
import z from "zod";
import { $ZodIssue } from "zod/v4/core";
import { authClient } from "@/auth/authClient";
import { RESET_PASSWORD_PARAM } from "@/constants";
import SocialSigninButton from "./socialSigninButton";
import {
  Anchor,
  Button,
  CardActions,
  Checkbox,
  Input,
  Spinner,
} from "@barrelrolla/react-components-library";
import { PiEnvelopeBold, PiKeyBold, PiUserBold } from "react-icons/pi";
import { useTranslations } from "next-intl";

export default function SigninFormContent({
  emailNotVerified,
  username,
  email,
  password,
  repeatPassword,
  rememberMe,
  signup = false,
  loading = false,
  error,
  issue,
  toggleSingin,
}: {
  emailNotVerified: boolean;
  username: string;
  email?: string;
  password: string;
  repeatPassword?: string;
  rememberMe?: boolean;
  signup?: boolean;
  loading?: boolean;
  error?: string;
  issue?: $ZodIssue;
  toggleSingin: (signup?: boolean) => void;
}) {
  const [resetLoading, setResetLoading] = useState(false);
  const [resetReqested, setResetRequested] = useState(false);
  const [resetError, setResetError] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationReqested, setVerificationRequested] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const tGlobal = useTranslations("Global");
  const t = useTranslations("AuthModal");

  function resetPass() {
    const currentEmail = emailRef.current?.value || "";
    const Email = z.object({ email: z.email() });
    const parsedEmail = Email.safeParse({ email: currentEmail });
    if (!parsedEmail.data) {
      if (parsedEmail.error.issues.length > 0) {
        setResetError(parsedEmail.error.issues[0].message);
      } else {
        setResetError(tGlobal("something-went-wrong"));
      }
      return;
    }

    authClient.requestPasswordReset(
      {
        email: parsedEmail.data.email,
        redirectTo: `/?${RESET_PASSWORD_PARAM}=`,
      },
      {
        onRequest: () => {
          setResetError("");
          setResetLoading(true);
        },
        onSuccess: () => {
          setResetLoading(false);
          setResetRequested(true);
        },
        onError: (ctx) => {
          setResetLoading(false);
          setResetError(ctx.error.message || tGlobal("something-went-wrong"));
        },
      },
    );
  }

  function requestVerification() {
    const currentEmail = emailRef.current?.value || "";
    const Email = z.object({ email: z.email() });
    const parsedEmail = Email.safeParse({ email: currentEmail });
    if (!parsedEmail.data) {
      if (parsedEmail.error.issues.length > 0) {
        setVerificationError(parsedEmail.error.issues[0].message);
      } else {
        setVerificationError(tGlobal("something-went-wrong"));
      }
      return;
    }

    authClient.sendVerificationEmail(
      {
        email: parsedEmail.data.email,
      },
      {
        onRequest: () => {
          setVerificationError("");
          setVerificationLoading(true);
        },
        onSuccess: () => {
          setVerificationLoading(false);
          setVerificationRequested(true);
        },
        onError: (ctx) => {
          setVerificationLoading(false);
          setVerificationError(
            ctx.error.message || tGlobal("something-went-wrong"),
          );
        },
      },
    );
  }

  return (
    <>
      <Input
        wrapperClassName="w-full"
        required
        ref={emailRef}
        as="input"
        startIcon={<PiUserBold />}
        aria-label={
          signup ? t("username-input-label") : t("username-email-input-label")
        }
        placeholder={
          signup ? t("username-input-label") : t("username-email-input-label")
        }
        type="text"
        id="username"
        autoComplete="username"
        name="username"
        defaultValue={username}
        error={
          issue && issue.path.length > 0 && issue.path[0] === "username"
            ? issue.message
            : undefined
        }
      />
      {signup && (
        <Input
          wrapperClassName="w-full"
          required
          startIcon={<PiEnvelopeBold />}
          aria-label={t("email-input-label")}
          placeholder={t("email-input-label")}
          type="email"
          id="email"
          autoComplete="email"
          name="email"
          defaultValue={email}
          error={
            issue && issue.path.length > 0 && issue.path[0] === "email"
              ? issue.message
              : undefined
          }
        />
      )}
      <Input
        wrapperClassName="w-full"
        required
        startIcon={<PiKeyBold />}
        aria-label={t("password-input-label")}
        placeholder={t("password-input-label")}
        type="password"
        id="password"
        name="password"
        autoComplete={signup ? "new-password" : "current-password"}
        defaultValue={password}
        error={
          issue && issue.path.length > 0 && issue.path[0] === "password"
            ? issue.message
            : undefined
        }
      />
      {signup && (
        <Input
          wrapperClassName="w-full"
          required
          startIcon={<PiKeyBold />}
          aria-label={t("repeat-password-input-label")}
          placeholder={t("repeat-password-input-label")}
          type="password"
          id="repeat-password"
          name="repeat-password"
          autoComplete={signup ? "new-password" : "current-password"}
          defaultValue={repeatPassword}
          error={
            issue &&
            issue.path.length > 0 &&
            issue.path[0] === "repeat-password"
              ? issue.message
              : undefined
          }
        />
      )}
      {!signup && (
        <Checkbox
          color="primary"
          wrapperClassName="mt-2 w-fit"
          name="remember"
          defaultChecked={rememberMe}
        >
          {t("remember-me")}
        </Checkbox>
      )}
      <CardActions className="w-full p-0 mt-2 flex flex-col gap-2">
        <Button
          wrapperClassName="flex-1"
          color="primary"
          className="w-full"
          size="sm"
          type="submit"
          loading={loading}
        >
          {signup ? t("sign-up") : t("sign-in")}
        </Button>
        {error && !issue && (
          <p className="mt-1 text-center text-error">{error}</p>
        )}
        {!emailNotVerified && !signup && error && !resetReqested && (
          <p className="text-xs text-center flex items-center justify-center">
            {t("forgotten-password")}
            {!resetLoading && (
              <Anchor
                className="cursor-pointer ml-1"
                as="button"
                type="button"
                onClick={resetPass}
              >
                {t("request-reset-email")}
              </Anchor>
            )}
            {resetLoading && <Spinner className="ml-1" />}
          </p>
        )}
        {emailNotVerified && !verificationReqested && (
          <p className="text-xs text-center flex items-center justify-center">
            {t("verification-expired")}
            {!verificationLoading && (
              <Anchor
                className="cursor-pointer ml-1"
                as="button"
                type="button"
                onClick={requestVerification}
              >
                {t("request-verification")}
              </Anchor>
            )}
            {verificationLoading && <Spinner className="ml-1" />}
          </p>
        )}
        {!signup && error && resetReqested && (
          <p className="text-xs text-center">{t("email-sent")}</p>
        )}
        {emailNotVerified && verificationReqested && (
          <p className="text-xs text-center">{t("email-sent")}</p>
        )}
        {resetError && (
          <p className="text-xs text-error text-center">{resetError}</p>
        )}
        {verificationError && (
          <p className="text-xs text-error text-center">{verificationError}</p>
        )}
        <SocialSigninButton social="google" />
        <SocialSigninButton social="apple" />
      </CardActions>
      {!signup && (
        <p className="text-center">
          {t("dont-have-account")}
          <Anchor
            className="cursor-pointer"
            type="button"
            as={"button"}
            onClick={() => toggleSingin(true)}
          >
            {t("sign-up")}
          </Anchor>
        </p>
      )}
      {signup && (
        <p className="text-center">
          {t("already-have-account")}
          <Anchor
            className="cursor-pointer"
            type="button"
            as={"button"}
            onClick={() => toggleSingin()}
          >
            {t("sign-in")}
          </Anchor>
        </p>
      )}
    </>
  );
}
