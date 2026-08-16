"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SIGNIN_PARAM, SIGNUP_PARAM } from "@/constants";
import {
  Button,
  ButtonVariant,
  ColorType,
} from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";

export default function SigninButton({ signup }: { signup?: boolean }) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations("AuthModal");

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
    >
      {signup ? t("sign-up") : t("sign-in")}
    </Button>
  );
}
