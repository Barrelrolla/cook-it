import { useRef, useState } from "react";
import z from "zod";
import { ZodIssue } from "zod/v3";
import { authClient } from "@/auth/authClient";
import { RESET_PASSWORD_PARAM, SOMETHING_WENT_WRONG } from "@/utils/constants";
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
  issue?: ZodIssue;
  toggleSingin: (signup?: boolean) => void;
}) {
  const [resetLoading, setResetLoading] = useState(false);
  const [resetReqested, setResetRequested] = useState(false);
  const [resetError, setResetError] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationReqested, setVerificationRequested] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const emailRef = useRef<HTMLInputElement | null>(null);

  function resetPass() {
    const currentEmail = emailRef.current?.value || "";
    const Email = z.object({ email: z.email() });
    const parsedEmail = Email.safeParse({ email: currentEmail });
    if (!parsedEmail.data) {
      if (parsedEmail.error.issues.length > 0) {
        setResetError(parsedEmail.error.issues[0].message);
      } else {
        setResetError(SOMETHING_WENT_WRONG);
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
          setResetError(ctx.error.message || SOMETHING_WENT_WRONG);
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
        setVerificationError(SOMETHING_WENT_WRONG);
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
          setVerificationError(ctx.error.message || SOMETHING_WENT_WRONG);
        },
      },
    );
  }

  return (
    <>
      <Input
        required
        startIcon={<PiUserBold />}
        aria-label={signup ? "username" : "username or email"}
        type="text"
        placeholder={signup ? "username" : "username or email"}
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
          ref={emailRef}
          required
          startIcon={<PiEnvelopeBold />}
          aria-label="email"
          type="email"
          placeholder="email"
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
        required
        startIcon={<PiKeyBold />}
        aria-label="password"
        type="password"
        placeholder="password"
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
          required
          startIcon={<PiKeyBold />}
          aria-label="repeat password"
          type="password"
          placeholder="repeat password"
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
        <Checkbox name="remember" defaultChecked={rememberMe}>
          Remember me?
        </Checkbox>
      )}
      <CardActions className="w-full p-0 mt-2 flex flex-col gap-2">
        <Button
          wrapperClasses="flex-1"
          className="w-full"
          size="sm"
          type="submit"
          loading={loading}
        >
          {signup ? "Sign up" : "Sign in"}
        </Button>
        {error && !issue && (
          <p className="mt-1 text-center text-error-content">{error}</p>
        )}
        {!emailNotVerified && !signup && error && !resetReqested && (
          <p className="text-xs text-center flex items-center justify-center">
            Forgotten password?{" "}
            {!resetLoading && (
              <Anchor
                className="cursor-pointer ml-1"
                as="button"
                type="button"
                onClick={resetPass}
              >
                Send reset email.
              </Anchor>
            )}
            {resetLoading && <Spinner className="ml-1" />}
          </p>
        )}
        {emailNotVerified && !verificationReqested && (
          <p className="text-xs text-center flex items-center justify-center">
            Verification expired?
            {!verificationLoading && (
              <Anchor
                className="cursor-pointer ml-1"
                as="button"
                type="button"
                onClick={requestVerification}
              >
                Send new verification.
              </Anchor>
            )}
            {verificationLoading && <Spinner className="ml-1" />}
          </p>
        )}
        {!signup && error && resetReqested && (
          <p className="text-xs text-center">Email sent.</p>
        )}
        {emailNotVerified && verificationReqested && (
          <p className="text-xs text-center">Email sent.</p>
        )}
        {resetError && (
          <p className="text-xs text-error-content text-center">{resetError}</p>
        )}
        {verificationError && (
          <p className="text-xs text-error-content text-center">
            {verificationError}
          </p>
        )}
        <SocialSigninButton social="google" />
        <SocialSigninButton social="apple" />
      </CardActions>
      {!signup && (
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Anchor
            className="cursor-pointer"
            type="button"
            as={"button"}
            onClick={() => toggleSingin(true)}
          >
            Sign up
          </Anchor>
        </p>
      )}
      {signup && (
        <p className="text-center">
          Already have an account?{" "}
          <Anchor
            className="cursor-pointer"
            type="button"
            as={"button"}
            onClick={() => toggleSingin()}
          >
            Sign in
          </Anchor>
        </p>
      )}
    </>
  );
}
