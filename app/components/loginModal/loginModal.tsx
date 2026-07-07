"use client";

import {
  Button,
  Card,
  CardActions,
  CardTitle,
  Dialog,
  Input,
} from "@barrelrolla/react-components-library";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LoginModal() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const showLogin = searchParams.has("login");
  const showSignup = searchParams.has("signup");

  function close() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("login");
    params.delete("signup");
    const query = params.toString();
    router.replace(query ? `${path}?${query}` : path, { scroll: false });
  }

  return (
    <>
      <Dialog isOpen={showLogin} setIsOpen={() => close()}>
        <Form close={close} />
      </Dialog>
      <Dialog isOpen={showSignup} setIsOpen={() => close()}>
        <Form signup close={close} />
      </Dialog>
    </>
  );
}

function Form({
  signup = false,
  close,
}: {
  signup?: boolean;
  close: () => void;
}) {
  return (
    <Card containerClasses="@container-normal min-w-75">
      <CardTitle>{signup ? "Sign Up" : "Login"}</CardTitle>
      <form className="flex flex-col px-4 mt-2 gap-2">
        <Input
          label="Username"
          type="text"
          placeholder="username"
          id="username"
          autoComplete="username"
          className="text-sm"
        ></Input>
        <Input
          label="Password"
          type="password"
          placeholder="password"
          id="password"
          autoComplete="password"
          className="text-sm"
        ></Input>
        {signup && (
          <>
            <Input
              label="Repeat Password"
              type="password"
              placeholder="password"
              id="repeat-password"
              autoComplete="password"
              className="text-sm"
            ></Input>
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
          <Button size="sm" type="button">
            {signup ? "Sign up" : "Login"}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}
