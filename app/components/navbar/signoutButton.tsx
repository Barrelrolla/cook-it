"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/auth/authClient";
import { SIGNOUT } from "@/utils/constants";
import { Button } from "@barrelrolla/react-components-library";

export function SignoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  return (
    <form
      className="max-md:w-full"
      action={async () => {
        await authClient.signOut({
          fetchOptions: {
            onRequest: () => {
              setIsLoading(true);
              setError("");
            },
            onSuccess: () => {
              setIsLoading(false);
              router.refresh();
            },
            onError: (ctx) => {
              setIsLoading(false);
              setError(ctx.error.message);
            },
          },
        });
      }}
    >
      <Button className="w-full" type="submit" loading={isLoading}>
        {SIGNOUT}
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
}
