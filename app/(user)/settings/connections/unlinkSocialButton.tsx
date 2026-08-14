"use client";

import DestructiveModal from "@/app/components/destructiveModal";
import { authClient } from "@/auth/authClient";
import { Button } from "@barrelrolla/react-components-library";
import { useRouter } from "next/navigation";
import { useState } from "react";

Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

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
      <DestructiveModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        action={unlink}
        title={`Unlink ${social.capitalize()} account`}
      />
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
      {error && <p className="text-sm text-error">{error}</p>}
    </>
  );
}
