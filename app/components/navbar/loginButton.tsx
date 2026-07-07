"use client";
import {
  Button,
  ButtonVariant,
  ColorType,
} from "@barrelrolla/react-components-library";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function LoginButton({ signup }: { signup?: boolean }) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());
  if (signup) {
    params.append("signup", "");
  } else {
    params.append("login", "");
  }
  const query = params.toString();
  const color: ColorType = signup ? "primary" : "main";
  const variant: ButtonVariant = signup ? "solid" : "ghost";
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
      {signup ? "Sign Up" : "Login"}
    </Button>
  );
}
