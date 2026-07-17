import { authClient } from "@/auth/authClient";
import { RESET_PASSWORD_PARAM, SOMETHING_WENT_WRONG } from "@/utils/constants";
import {
  Anchor,
  Button,
  CardActions,
  Input,
  Spinner,
} from "@barrelrolla/react-components-library";
import { useRef, useState } from "react";
import { PiEnvelopeBold, PiKeyBold, PiUserBold } from "react-icons/pi";
import SocialSigninButton from "./socialSigninButton";
import { ZodIssue } from "zod/v3";
import z from "zod";

export default function SigninFormContent({
  displayName,
  email,
  password,
  repeatPassword,
  signup = false,
  loading = false,
  error,
  issue,
  toggleSingin,
}: {
  displayName?: string;
  email: string;
  password: string;
  repeatPassword?: string;
  signup?: boolean;
  loading?: boolean;
  error?: string;
  issue?: ZodIssue;
  toggleSingin: (signup?: boolean) => void;
}) {
  const [resetLoading, setResetLoading] = useState(false);
  const [resetReqested, setResetRequested] = useState(false);
  const [resetError, setResetError] = useState("");
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

  return (
    <>
      {signup && (
        <Input
          required
          startIcon={<PiUserBold />}
          aria-label="display name"
          type="text"
          placeholder="display name"
          id="display-name"
          autoComplete="username"
          name="display-name"
          defaultValue={displayName}
          error={
            issue && issue.path.length > 0 && issue.path[0] === "displayName"
              ? issue.message
              : undefined
          }
        />
      )}
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
        {!signup && error && !resetReqested && (
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
        {!signup && error && resetReqested && (
          <p className="text-xs text-center">Email sent.</p>
        )}
        {resetError && (
          <p className="text-xs text-error-content text-center">{resetError}</p>
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
