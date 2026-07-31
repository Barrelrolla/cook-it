"use client";

import { authClient } from "@/auth/authClient";
import { Button } from "@barrelrolla/react-components-library";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UnlinkSocialButton({
  social,
}: {
  social: "google" | "apple";
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function unlink() {
    authClient.unlinkAccount(
      { providerId: social },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          router.refresh();
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setIsLoading(false);
        },
      },
    );
  }
  return (
    <>
      <Button loading={isLoading} size="xs" color="error" onClick={unlink}>
        Unlink
      </Button>
      {error && <p className="text-sm text-error-content">{error}</p>}
    </>
  );
}
