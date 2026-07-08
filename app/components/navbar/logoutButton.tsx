"use client";
import { authClient } from "@/auth/authClient";
import { Button } from "@barrelrolla/react-components-library";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <form
      action={async () => {
        await authClient.signOut({
          fetchOptions: {
            onRequest: () => {
              setIsLoading(true);
            },
            onSuccess: () => {
              router.refresh();
            },
            onError: (ctx) => {
              console.log(ctx.error.message);
            },
          },
        });
      }}
    >
      <Button type="submit" loading={isLoading}>
        Logout
      </Button>
    </form>
  );
}
