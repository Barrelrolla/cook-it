"use client";
import { SIGNIN_PARAM, SIGNUP_PARAM } from "@/utils/constants";
import {
  Button,
  ButtonVariant,
  ColorType,
} from "@barrelrolla/react-components-library";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SigninButton({ signup }: { signup?: boolean }) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());
  if (signup) {
    params.append(SIGNUP_PARAM, "");
  } else {
    params.append(SIGNIN_PARAM, "");
  }
  const query = params.toString();
  const color: ColorType = signup ? "main" : "primary";
  const variant: ButtonVariant = signup ? "ghost" : "solid";
  return (
    <Button
      onClick={() => {
        router.replace(`${path}/?${query}`, {
          scroll: false,
        });
      }}
      color={color}
      variant={variant}
      ghostHover="outline"
    >
      {signup ? "Sign Up" : "Sign in"}
    </Button>
  );
}
