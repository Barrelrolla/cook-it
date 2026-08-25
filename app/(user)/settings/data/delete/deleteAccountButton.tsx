"use client";
import BaseModal from "@/app/components/baseModal";
import DestructiveModal from "@/app/components/destructiveModal";
import { authClient } from "@/auth/authClient";
import { Button, Input } from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function DeleteAccountButton() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRequested, setIsRequested] = useState(false);
  const t = useTranslations("Settings.Data.Delete");

  function deleteAccount(formData: FormData) {
    const enteredPass = formData.get("password")?.toString() || "";
    setIsPasswordOpen(false);
    setError("");

    authClient.deleteUser(
      { password: enteredPass },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          setIsRequested(true);
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
        isOpen={isConfirmationOpen}
        setIsOpen={setIsConfirmationOpen}
        title={t("delete-account")}
        action={() => {
          setIsConfirmationOpen(false);
          setIsPasswordOpen(true);
        }}
      />
      <BaseModal
        closeLabel={t("close")}
        isOpen={isPasswordOpen}
        setIsOpen={setIsPasswordOpen}
        formAction={deleteAccount}
        title={t("delete-account")}
      >
        <p className="text-sm">{t("warning-message")}</p>
        <Input
          revealPasswordToggleAriaLabel={t("reveal-password")}
          wrapperClassName="w-full"
          type="password"
          name="password"
        />
        <div className="w-full flex flex-row justify-between">
          <Button
            type="button"
            color="main"
            variant="outline"
            onClick={() => {
              setIsPasswordOpen(false);
            }}
            size="sm"
          >
            {t("cancel")}
          </Button>
          <Button size="sm" color="error">
            {t("delete")}
          </Button>
        </div>
      </BaseModal>
      <Button
        size="sm"
        loading={isLoading}
        disabled={isRequested}
        color="error"
        onClick={() => {
          setIsConfirmationOpen(true);
        }}
      >
        {t("delete-button")}
      </Button>
      {isRequested && <p className="text-sm">{t("email-sent")}</p>}
      {error && <p className="text-sm text-error">{error}</p>}
    </>
  );
}
