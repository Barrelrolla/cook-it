"use client";

import { Button } from "@barrelrolla/react-components-library";
import GoogleLogo from "../logos/googleLogo";
import { useState } from "react";
import { authClient } from "@/auth/authClient";
import { SOMETHING_WENT_WRONG } from "@/utils/constants";
import AppleLogo from "../logos/appleLogo";

type Social = "google" | "apple";

export default function SocialSigninButton({ social }: { social: Social }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          setError(ctx.error.message ?? SOMETHING_WENT_WRONG);
        },
      },
    );
  }

  let socialName = "";
  switch (social) {
    case "google":
      socialName = "Google";
      break;
    case "apple":
      socialName = "Apple";
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
        <span>{`Sign in with ${socialName}`}</span>
      </Button>
      {error && <p className="text-center text-error-content">{error}</p>}
    </>
  );
}
