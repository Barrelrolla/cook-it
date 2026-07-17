"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/auth/authClient";
import { Anchor, Button } from "@barrelrolla/react-components-library";
import { SIGNOUT } from "@/utils/constants";
import { user as userSchema } from "@/db/schemas/auth-schema";

export function SignoutButton({
  user,
}: {
  user: typeof userSchema.$inferSelect;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  return (
    <>
      <p>
        <Anchor as={Link} href={`/user/${user.displayName?.toLowerCase()}`}>
          {user.name}
        </Anchor>
      </p>
      <form
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
        <Button type="submit" loading={isLoading}>
          {SIGNOUT}
        </Button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
}
