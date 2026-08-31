"use client";

import DestructiveModal from "@/app/components/destructiveModal";
import { authClient } from "@/auth/authClient";
import { Button } from "barrelrolla-ui";
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

  async function unlink() {
    setIsOpen(false);
    const { data: accounts, error } = await authClient.listAccounts();
    if (error) {
      setError(error.message || tGlobal("something-went-wrong"));
      return;
    }
    const account = accounts?.find((account) => account.providerId === social);
    if (!account) {
      setError(tGlobal("account-not-found"));
      return;
    }

    authClient.unlinkAccount(
      { accountId: account.id },
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
