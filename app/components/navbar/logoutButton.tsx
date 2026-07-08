"use client";
import { authClient } from "@/auth/authClient";
import { Anchor, Button } from "@barrelrolla/react-components-library";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton({
  user,
}: {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  return (
    <>
      <p>
        <Anchor as={Link} href={`/user/${user.id}`}>
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
          Logout
        </Button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
}
