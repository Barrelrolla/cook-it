"use client";

import DestructiveModal from "@/app/components/destructiveModal";
import { authClient } from "@/auth/authClient";
import { Button } from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
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
  const tGlobal = useTranslations("Global");
  const t = useTranslations("Settings.Connections");
  const socialName = social === "google" ? tGlobal("google") : tGlobal("apple");

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
        title={t("unlink-message", { social: socialName })}
      />
      <Button
        loading={isLoading}
        size="xs"
        color="error"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {t("unlink")}
      </Button>
      {error && <p className="text-sm text-error">{error}</p>}
    </>
  );
}
