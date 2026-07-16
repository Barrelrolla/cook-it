"use client";

import { Ref, useRef, useState } from "react";
import { authClient } from "@/auth/authClient";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Anchor,
  Button,
  Card,
  CardActions,
  CardTitle,
  Dialog,
  Input,
  Spinner,
} from "@barrelrolla/react-components-library";
import {
  PiCheckBold,
  PiEnvelopeBold,
  PiKeyBold,
  PiUserBold,
} from "react-icons/pi";
import {
  SIGNIN_PARAM,
  SIGNUP_PARAM,
  SOMETHING_WENT_WRONG,
} from "@/utils/constants";
import GoogleLogo from "../googleLogo";
import AppleLogo from "../appleLogo";
import z from "zod";
import { ZodIssue } from "zod/v3";

export default function SigninModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [issue, setIssue] = useState<ZodIssue | undefined>(undefined);
  const [accountCreated, setAccountCreated] = useState(true);
  const loginFormRef = useRef<HTMLFormElement>(null);
  const signupFormRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const showSignin = searchParams.has(SIGNIN_PARAM);
  const showSignup = searchParams.has(SIGNUP_PARAM);
  const passwordSchema = z
    .string()
    .min(8, { message: "Password should be at least 8 symbols." })
    .max(20, { message: "Password should be maximum 20 symbols." })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password should include at least one uppercase letter.",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password should include at least one lowercase letter.",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password should inlude at least one number.",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "Password should include at least one special character.",
    });

  async function signin(formData: FormData) {
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    await authClient.signIn.email(
      {
        email,
        password,
        rememberMe: true,
      },
      {
        onRequest: () => {
          setError("");
          setIssue(undefined);
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          close();
          router.refresh();
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(ctx.error.message || SOMETHING_WENT_WRONG);
        },
      },
    );
  }

  async function signUp(formData: FormData) {
    const name = formData.get("username")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const repeatPassword = formData.get("repeat-password")?.toString() || "";

    const User = z
      .object({
        name: z
          .string()
          .min(3, "Username should be at least 3 characters long!"),
        email: z.email(),
        password: passwordSchema,
        repeatPassword: z.string(),
      })
      .refine((data) => data.password === data.repeatPassword, {
        path: ["repeat-password"],
        message: "Passwords do not match.",
      });

    const user = User.safeParse({ name, email, password, repeatPassword });
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
        name: user.data.name,
        email: user.data.email,
        password: user.data.password,
        callbackURL: `/user/${user.data.name}`,
      },
      {
        onRequest: () => {
          setError("");
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
    loginFormRef.current?.reset();
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
      <Dialog
        backdropClasses="items-start md:items-center"
        className="mt-22 md:mt-0"
        isOpen={showSignin}
        setIsOpen={() => close()}
      >
        <Form
          formRef={loginFormRef}
          loading={isLoading}
          toggleSingin={toggleSignin}
          close={close}
          action={signin}
          error={error}
        />
      </Dialog>
      <Dialog
        backdropClasses="items-start md:items-center"
        className="mt-22 md:mt-0"
        isOpen={showSignup}
        setIsOpen={() => close()}
      >
        {accountCreated && (
          <Card containerClasses="flex items-center text-center justify-center p-4 min-w-70 w-70 md:min-w-80 md:w-80 h-90">
            <p className="flex self-center">
              Account created.{" "}
              <span className="text-success-content ml-2 text-2xl">
                <PiCheckBold />
              </span>
            </p>
            <p>We&apos;ve sent you an email with a verification link.</p>
            <Button className="w-full mt-4" role="button" onClick={close}>
              Close
            </Button>
          </Card>
        )}
        {!accountCreated && (
          <Form
            formRef={signupFormRef}
            signup
            loading={isLoading}
            toggleSingin={toggleSignin}
            close={close}
            action={signUp}
            error={error}
            issue={issue || undefined}
          />
        )}
      </Dialog>
    </>
  );
}

function Form({
  formRef,
  signup = false,
  loading = false,
  error = "bla",
  issue,
  toggleSingin,
  close,
  action,
}: {
  formRef?: Ref<HTMLFormElement>;
  signup?: boolean;
  loading?: boolean;
  error?: string;
  issue?: ZodIssue;
  toggleSingin: (signup?: boolean) => void;
  close: () => void;
  action: (payload: FormData) => void;
}) {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");
  const [appleError, setAppleError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetReqested, setResetRequested] = useState(false);
  const [resetError, setResetError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatpasswordRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  function resetPass() {
    authClient.requestPasswordReset(
      { email },
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
    <Card containerClasses="min-w-70 w-70 md:min-w-80 md:w-80">
      <CardTitle className="font-heading">
        {signup ? "Sign Up" : "Sign in"}
      </CardTitle>
      <form
        action={(data) => {
          setEmail(emailRef.current?.value || "");
          setPassword(passwordRef.current?.value || "");
          setRepeatPassword(repeatpasswordRef.current?.value || "");
          setUserName(userNameRef.current?.value || "");
          action(data);
        }}
        ref={formRef}
        className="flex flex-col p-4 pt-0 gap-2 text-sm"
      >
        {signup && (
          <Input
            startIcon={<PiUserBold />}
            ref={userNameRef}
            aria-label="username"
            type="text"
            placeholder="username"
            id="username"
            autoComplete="username"
            name="username"
            defaultValue={userName}
            error={
              issue && issue.path.length > 0 && issue.path[0] === "name"
                ? issue.message
                : undefined
            }
          />
        )}
        <Input
          startIcon={<PiEnvelopeBold />}
          ref={emailRef}
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
          startIcon={<PiKeyBold />}
          ref={passwordRef}
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
            startIcon={<PiKeyBold />}
            ref={repeatpasswordRef}
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
                  className="cursor-pointer"
                  as="button"
                  type="button"
                  onClick={resetPass}
                >
                  Send reset email.
                </Anchor>
              )}
              {resetLoading && <Spinner className="ml-2" />}
            </p>
          )}
          {!signup && error && resetReqested && (
            <p className="text-xs text-center">Email sent.</p>
          )}
          {resetError && (
            <p className="text-xs text-error-content text-center">
              {resetError}
            </p>
          )}
          <Button
            className="w-full font-google font-medium inset-ring-main-content/30"
            variant="outline"
            color="main"
            size="sm"
            type="button"
            startIcon={
              <div className="w-6 flex justify-center">
                <GoogleLogo />
              </div>
            }
            loading={googleLoading}
            onClick={() => {
              authClient.signIn.social(
                { provider: "google" },
                {
                  onRequest: () => {
                    setGoogleLoading(true);
                    setGoogleError("");
                  },
                  onSuccess: () => {
                    setGoogleLoading(false);
                    close();
                  },
                  onError: (ctx) => {
                    setGoogleLoading(false);
                    setGoogleError(ctx.error.message ?? SOMETHING_WENT_WRONG);
                  },
                },
              );
            }}
          >
            <span>Sign in with Google</span>
          </Button>
          {googleError && (
            <p className="text-center text-error-content">{googleError}</p>
          )}
          <Button
            className="w-full inset-ring-main-content/30"
            variant="outline"
            color="main"
            size="sm"
            type="button"
            startIcon={<AppleLogo />}
            loading={appleLoading}
            onClick={() => {
              authClient.signIn.social(
                { provider: "apple" },
                {
                  onRequest: () => {
                    setAppleLoading(true);
                    setAppleError("");
                  },
                  onSuccess: () => {
                    setAppleLoading(false);
                    close();
                  },
                  onError: (ctx) => {
                    setAppleLoading(false);
                    setAppleError(ctx.error.message ?? SOMETHING_WENT_WRONG);
                  },
                },
              );
            }}
          >
            <span>Sign in with Apple</span>
          </Button>
          {appleError && (
            <p className="text-center text-error-content">{appleError}</p>
          )}
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
      </form>
    </Card>
  );
}
