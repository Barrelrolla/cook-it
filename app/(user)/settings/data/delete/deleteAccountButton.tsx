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
import { useState } from "react";

export default function DeleteAccountButton() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRequested, setIsRequested] = useState(false);

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
        title="Delete account"
        action={() => {
          setIsConfirmationOpen(false);
          setIsPasswordOpen(true);
        }}
      />
      <Dialog isOpen={isPasswordOpen} setIsOpen={setIsPasswordOpen}>
        <Card>
          <CardTitle>Delete account</CardTitle>
          <CardText className="text-sm">
            This account is irrevirsible. This will permanently delete your
            account as well as all recipes you&apos;ve shared. If you&apos;re
            certain you want to continue, please enter your password.
          </CardText>
          <CardActions className="w-full">
            <form className="w-full flex flex-col gap-4" action={deleteAccount}>
              <Input
                inputContainerClassName="w-full"
                type="password"
                name="password"
              />
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => {
                    setIsPasswordOpen(false);
                  }}
                  size="sm"
                >
                  Cancel
                </Button>
                <Button size="sm" color="error">
                  Delete
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
        Delete account
      </Button>
      {isRequested && (
        <p className="text-sm">
          We&apos;ve sent you a confirmation email. Click the link inside to
          complete the deletion.
        </p>
      )}
      {error && <p className="text-sm text-error">{error}</p>}
    </>
  );
}
