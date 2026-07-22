"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ErrorContext } from "better-auth/react";
import { authClient } from "@/auth/authClient";
import z from "zod";
import { ZodIssue } from "zod/v3";
import { SignUpSchema } from "@/utils/validationSchemas";
import BaseModal from "../baseModal";
import SigninFormContent from "./signinFormContent";
import { Button } from "@barrelrolla/react-components-library";
import {
  SIGNIN,
  SIGNIN_PARAM,
  SIGNUP,
  SIGNUP_PARAM,
  SOMETHING_WENT_WRONG,
} from "@/utils/constants";
import userPlaceholderImage from "@/public/user-placeholder.png";
import { PiCheckBold } from "react-icons/pi";

export default function SigninModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [issue, setIssue] = useState<ZodIssue | undefined>(undefined);
  const [accountCreated, setAccountCreated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [emailNotVerified, setEmailNotVerified] = useState(false);
  const signinFormRef = useRef<HTMLFormElement>(null);
  const signupFormRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const showSignin = searchParams.has(SIGNIN_PARAM);
  const showSignup = searchParams.has(SIGNUP_PARAM);

  function onRequest() {
    setError("");
    setEmailNotVerified(false);
    setIssue(undefined);
    setIsLoading(true);
  }
  function onSuccess() {
    setIsLoading(false);
    close();
    router.refresh();
  }
  function onError(ctx: ErrorContext) {
    if (ctx.error.status === 403) {
      setEmailNotVerified(true);
    }
    setIsLoading(false);
    setError(ctx.error.message || SOMETHING_WENT_WRONG);
  }

  async function signin(formData: FormData) {
    const enteredUsername = formData.get("username")?.toString() || "";
    setUsername(enteredUsername);
    const enteredPass = formData.get("password")?.toString() || "";
    setPassword(enteredPass);
    const enteredRemember = formData.get("remember")?.toString() === "on";
    setRememberMe(enteredRemember);
    if (enteredUsername.indexOf("@") > 0) {
      await authClient.signIn.email(
        {
          email: enteredUsername,
          password: enteredPass,
          rememberMe: true,
        },
        {
          onRequest: () => {
            onRequest();
          },
          onSuccess: () => {
            onSuccess();
          },
          onError: (ctx) => {
            onError(ctx);
          },
        },
      );
    } else {
      await authClient.signIn.username(
        {
          username: enteredUsername,
          password: enteredPass,
          rememberMe: enteredRemember,
        },
        {
          onRequest: () => {
            onRequest();
          },
          onSuccess: () => {
            onSuccess();
          },
          onError: (ctx) => {
            onError(ctx);
          },
        },
      );
    }
  }

  async function signUp(formData: FormData) {
    const enteredUsername = formData.get("username")?.toString() || "";
    setUsername(enteredUsername);
    const enteredEmail = formData.get("email")?.toString() || "";
    setEmail(enteredEmail);
    const enteredPass = formData.get("password")?.toString() || "";
    setPassword(enteredPass);
    const enteredRepeatPass = formData.get("repeat-password")?.toString() || "";
    setRepeatPassword(enteredRepeatPass);

    const User = SignUpSchema.extend({ repeatPassword: z.string() }).refine(
      (data) => data.password === data.repeatPassword,
      {
        path: ["repeat-password"],
        message: "Passwords do not match.",
      },
    );

    const user = await User.safeParseAsync({
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPass,
      repeatPassword: enteredRepeatPass,
    });
    if (!user.data) {
      if (user.error.issues.length > 0) {
        setError(user.error.issues[0].message);
        setIssue(user.error.issues[0] as ZodIssue);
      } else {
        setError(SOMETHING_WENT_WRONG);
      }
      return;
    }

    await authClient.signUp.email(
      {
        email: user.data.email,
        name: user.data.username,
        password: user.data.password,
        username: user.data.username,
        displayUsername: user.data.username,
        image: userPlaceholderImage.src,
        callbackURL: `/user/${user.data.username}`,
      },
      {
        onRequest: () => {
          setError("");
          setEmailNotVerified(false);
          setIssue(undefined);
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          setAccountCreated(true);
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
    setAccountCreated(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setRememberMe(false);
    setEmailNotVerified(false);
    signinFormRef.current?.reset();
    signupFormRef.current?.reset();
  }

  function replaceParams(query: string) {
    router.replace(query ? `${path}?${query}` : path, { scroll: false });
  }

  function close() {
    reset();
    const params = new URLSearchParams(searchParams.toString());
    params.delete(SIGNIN_PARAM);
    params.delete(SIGNUP_PARAM);
    replaceParams(params.toString());
  }

  function toggleSignin(signup?: boolean) {
    reset();
    const params = new URLSearchParams(searchParams.toString());
    if (signup) {
      params.delete(SIGNIN_PARAM);
      params.append(SIGNUP_PARAM, "");
    } else {
      params.delete(SIGNUP_PARAM);
      params.append(SIGNIN_PARAM, "");
    }
    replaceParams(params.toString());
  }

  return (
    <>
      <BaseModal
        title={SIGNIN}
        formRef={signinFormRef}
        formAction={signin}
        isOpen={showSignin}
        setIsOpen={close}
      >
        <SigninFormContent
          emailNotVerified={emailNotVerified}
          username={username}
          password={password}
          rememberMe={rememberMe}
          loading={isLoading}
          toggleSingin={toggleSignin}
          error={error}
        />
      </BaseModal>
      <BaseModal
        title={SIGNUP}
        formRef={signupFormRef}
        formAction={signUp}
        isOpen={showSignup}
        setIsOpen={close}
      >
        {accountCreated && (
          <div className="flex flex-col w-full items-center text-center justify-center h-75">
            <p className="flex items-center">
              Account created.{" "}
              <span className="text-success-content ml-2 text-xl">
                <PiCheckBold />
              </span>
            </p>
            <p>We&apos;ve sent you an email with a verification link.</p>
            <Button
              className="w-full mt-4"
              wrapperClasses="w-full"
              role="button"
              size="sm"
              onClick={close}
            >
              Close
            </Button>
          </div>
        )}
        {!accountCreated && (
          <SigninFormContent
            emailNotVerified={emailNotVerified}
            username={username}
            email={email}
            password={password}
            repeatPassword={repeatPassword}
            signup
            loading={isLoading}
            toggleSingin={toggleSignin}
            error={error}
            issue={issue || undefined}
          />
        )}
      </BaseModal>
    </>
  );
}
