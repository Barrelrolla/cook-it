"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/auth/authClient";
import z from "zod";
import { CHOOSE_DISPLAY_NAME_PARAM } from "@/constants";
import BaseModal from "../baseModal";
import { createUsernameValidation } from "@/utils/validationSchemas";
import { Button, Input } from "barrelrolla-ui";
import { PiUserBold } from "react-icons/pi";
import { useTranslations } from "next-intl";

export default function UsernameModal() {
  const session = authClient.useSession();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const tGlobal = useTranslations("Global");
  const t = useTranslations("AuthModal");
  const tValidation = useTranslations("Validation");

  if (!session.data) {
    return null;
  }
  const user = session.data.user;

  const isOpen: boolean = !user.username;

  function close() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(CHOOSE_DISPLAY_NAME_PARAM);
    router.replace(params ? `${path}?${params}` : path, { scroll: false });
  }

  async function action(formData: FormData) {
    const enteredName = formData.get("username")?.toString() || "";
    setName(enteredName);
    setLoading(true);

    const Name = z.object({ username: createUsernameValidation(tValidation) });
    const parsedName = await Name.safeParseAsync({ username: enteredName });
    if (!parsedName.data) {
      if (parsedName.error.issues.length > 0) {
        setError(parsedName.error.issues[0].message);
      } else {
        setError(tGlobal("something-went-wrong"));
      }
      setLoading(false);
      return;
    }

    await authClient.updateUser({
      username: parsedName.data.username,
      displayUsername: parsedName.data.username,
      fetchOptions: {
        onRequest() {
          setError("");
          setLoading(true);
        },
        onSuccess() {
          setLoading(false);
          router.refresh();
        },
        onError(ctx) {
          setLoading(false);
          setError(ctx.error.message || tGlobal("something-went-wrong"));
        },
      },
    });
  }

  return (
    <BaseModal
      closeLabel={t("close")}
      title={t("choose-username-label")}
      formAction={action}
      isOpen={isOpen}
      setIsOpen={close}
    >
      <Input
        wrapperClassName="w-full"
        required
        disabled={loading}
        startIcon={<PiUserBold />}
        aria-label={t("username-input-label")}
        placeholder={t("username-input-label")}
        type="text"
        id="username"
        name="username"
        autoComplete="username"
        error={error}
        defaultValue={name}
      />
      <Button type="submit" disabled={loading} className="w-full" size="sm">
        {t("confirm-username")}
      </Button>
    </BaseModal>
  );
}
