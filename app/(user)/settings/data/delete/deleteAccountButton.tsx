"use client";
import DestructiveModal from "@/app/components/destructiveModal";
import { authClient } from "@/auth/authClient";
import {
  Button,
  Card,
  CardActions,
  CardText,
  CardTitle,
  Dialog,
  Input,
} from "@barrelrolla/react-components-library";
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
      <Dialog isOpen={isPasswordOpen} setIsOpen={setIsPasswordOpen}>
        <Card>
          <CardTitle>{t("delete-account")}</CardTitle>
          <CardText className="text-sm">{t("warning-message")}</CardText>
          <CardActions className="w-full">
            <form className="w-full flex flex-col gap-4" action={deleteAccount}>
              <Input
                wrapperClassName="w-full"
                type="password"
                name="password"
              />
              <div className="flex justify-between">
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
            </form>
          </CardActions>
        </Card>
      </Dialog>
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
