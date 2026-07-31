"use client";

import { authClient } from "@/auth/authClient";
import {
  Button,
  Card,
  CardActions,
  CardText,
  CardTitle,
  Dialog,
} from "@barrelrolla/react-components-library";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UnlinkSocialButton({
  social,
}: {
  social: "google" | "apple";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function unlink() {
    setIsOpen(false);
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
      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <Card className="w-[90vw] max-w-60">
          <form action={unlink}>
            <CardTitle className="font-heading">Unlink account</CardTitle>
            <CardText>Are you sure?</CardText>
            <CardActions className="flex justify-between w-full">
              <Button
                color="success"
                size="sm"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                NO
              </Button>
              <Button size="sm" color="error">
                YES
              </Button>
            </CardActions>
          </form>
        </Card>
      </Dialog>
      <Button
        loading={isLoading}
        size="xs"
        color="error"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Unlink
      </Button>
      {error && <p className="text-sm text-error-content">{error}</p>}
    </>
  );
}
