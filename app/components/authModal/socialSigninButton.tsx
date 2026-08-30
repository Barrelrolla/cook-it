"use client";

import { useState } from "react";
import { authClient } from "@/auth/authClient";
import { Button } from "barrelrolla-ui";
import GoogleLogo from "../logos/googleLogo";
import AppleLogo from "../logos/appleLogo";
import { useTranslations } from "next-intl";

type Social = "google" | "apple";

export default function SocialSigninButton({ social }: { social: Social }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const tGlobal = useTranslations("Global");
  const t = useTranslations("AuthModal");

  function signin() {
    authClient.signIn.social(
      { provider: social },
      {
        onRequest: () => {
          setLoading(true);
          setError("");
        },
        onSuccess: () => {
          setLoading(false);
          close();
        },
        onError: (ctx) => {
          setLoading(false);
          setError(ctx.error.message ?? tGlobal("something-went-wrong"));
        },
      },
    );
  }

  let socialName = "";
  switch (social) {
    case "google":
      socialName = tGlobal("google");
      break;
    case "apple":
      socialName = tGlobal("apple");
      break;
  }

  return (
    <>
      <Button
        className="w-full font-google font-medium inset-ring-main-content/30"
        variant="outline"
        color="main"
        size="sm"
        type="button"
        startIcon={
          <div className="w-6 flex justify-center">
            {social === "google" && <GoogleLogo />}
            {social === "apple" && <AppleLogo />}
          </div>
        }
        loading={loading}
        onClick={signin}
      >
        <span>{t("social-signin", { social: socialName })}</span>
      </Button>
      {error && <p className="text-center text-error">{error}</p>}
    </>
  );
}
