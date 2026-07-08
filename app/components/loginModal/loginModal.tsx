"use client";

import { authClient } from "@/auth/authClient";
import {
  Button,
  Card,
  CardActions,
  CardTitle,
  Dialog,
  Input,
} from "@barrelrolla/react-components-library";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Ref, useRef, useState } from "react";
import {
  PiEnvelopeBold,
  PiGoogleLogoBold,
  PiKeyBold,
  PiUserBold,
} from "react-icons/pi";

export default function LoginModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const loginFormRef = useRef<HTMLFormElement>(null);
  const signupFormRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const showLogin = searchParams.has("login");
  const showSignup = searchParams.has("signup");

  async function login(formData: FormData) {
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
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          close();
          router.refresh();
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(ctx.error.message);
        },
      },
    );
  }

  async function signUp(formData: FormData) {
    const name = formData.get("username")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: () => {
          setError("");
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          close();
          router.refresh();
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(ctx.error.message);
        },
      },
    );
  }

  function close() {
    setIsLoading(false);
    setError("");
    loginFormRef.current?.reset();
    signupFormRef.current?.reset();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("login");
    params.delete("signup");
    const query = params.toString();
    router.replace(query ? `${path}?${query}` : path, { scroll: false });
  }

  return (
    <>
      <Dialog isOpen={showLogin} setIsOpen={() => close()}>
        <Form
          formRef={loginFormRef}
          loading={isLoading}
          close={close}
          action={login}
        />
        {error && <p>{error}</p>}
      </Dialog>
      <Dialog isOpen={showSignup} setIsOpen={() => close()}>
        <Form
          formRef={signupFormRef}
          signup
          loading={isLoading}
          close={close}
          action={signUp}
        />
        {error && <p>{error}</p>}
      </Dialog>
    </>
  );
}

function Form({
  formRef,
  signup = false,
  loading = false,
  error,
  close,
  action,
}: {
  formRef?: Ref<HTMLFormElement>;
  signup?: boolean;
  loading?: boolean;
  error?: string;
  close: () => void;
  action?: (payload: FormData) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState("");
  return (
    <Card containerClasses="@container-normal min-w-75">
      <CardTitle className="font-heading">
        {signup ? "Sign Up" : "Login"}
      </CardTitle>
      <form
        action={action}
        ref={formRef}
        className="flex flex-col px-4 mt-2 gap-2"
      >
        <Input
          // label="Email"
          aria-label="email"
          startIcon={<PiEnvelopeBold />}
          type="email"
          placeholder="email"
          id="email"
          autoComplete="email"
          name="email"
          className="text-sm w-full"
        />
        <Input
          startIcon={<PiKeyBold />}
          // label="Password"
          aria-label="password"
          type="password"
          placeholder="password"
          id="password"
          name="password"
          autoComplete={signup ? "new-password" : "current-password"}
          className="text-sm w-full"
        />
        {signup && (
          <>
            <Input
              startIcon={<PiUserBold />}
              // label="Display name"
              aria-label="username"
              type="text"
              placeholder="username"
              id="username"
              autoComplete="username"
              name="username"
              className="text-sm w-full"
            />
          </>
        )}
        <CardActions className="flex w-full px-0 gap-2 justify-end">
          <Button
            size="sm"
            type="button"
            variant="ghost"
            color="main"
            ghostHover="outline"
            onClick={close}
          >
            Cancel
          </Button>
          <Button size="sm" type="submit" loading={loading}>
            {signup ? "Sign up" : "Login"}
          </Button>
        </CardActions>
        <div className="flex mb-4 w-full">
          <Button
            wrapperClasses="w-full"
            className="w-full"
            size="sm"
            type="button"
            loading={isLoading}
            onClick={() => {
              authClient.signIn.social(
                { provider: "google" },
                {
                  onRequest: () => {
                    setIsLoading(true);
                    setHasError("");
                  },
                  onSuccess: () => {
                    setIsLoading(false);
                    close();
                  },
                  onError: (ctx) => {
                    setIsLoading(false);
                    setHasError(ctx.error.message);
                  },
                },
              );
            }}
          >
            Login with Google {<PiGoogleLogoBold />}
          </Button>
        </div>
      </form>
      {error && <p>{error}</p>}
      {hasError && <p>{hasError}</p>}
    </Card>
  );
}
