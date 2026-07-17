"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BaseModal from "../baseModal";
import {
  CHOOSE_DISPLAY_NAME_PARAM,
  SOMETHING_WENT_WRONG,
} from "@/utils/constants";
import { user } from "@/db/schemas/auth-schema";
import { Button, Input } from "@barrelrolla/react-components-library";
import { useState } from "react";
import z from "zod";
import { displayNameSchema } from "@/utils/validationSchemas";
import { PiUserBold } from "react-icons/pi";
import { setUserDisplayName } from "@/app/actions/userActions";

type Props = { user: typeof user.$inferSelect };

export default function DisplayNameModal({ user }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const isOpen: boolean = !user.displayName;

  function close() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(CHOOSE_DISPLAY_NAME_PARAM);
    router.replace(params ? `${path}?${params}` : path, { scroll: false });
  }

  function action(formData: FormData) {
    console.log(formData);
    const enteredName = formData.get("display-name")?.toString() || "";
    setName(enteredName);

    const Name = z.object({ displayName: displayNameSchema });
    const parsedName = Name.safeParse({ displayName: enteredName });
    if (!parsedName.data) {
      if (parsedName.error.issues.length > 0) {
        setError(parsedName.error.issues[0].message);
      } else {
        setError(SOMETHING_WENT_WRONG);
      }
      return;
    }

    setLoading(true);
    setUserDisplayName(parsedName.data.displayName, user.id);
    router.refresh();
  }

  return (
    <BaseModal
      title="Choose your display name"
      formAction={action}
      isOpen={isOpen}
      setIsOpen={close}
    >
      <Input
        required
        disabled={loading}
        startIcon={<PiUserBold />}
        aria-label="display name"
        type="text"
        placeholder="display name"
        id="display-name"
        name="display-name"
        autoComplete="username"
        defaultValue={name}
      />
      <Button type="submit" disabled={loading} className="w-full" size="sm">
        Confirm display name
      </Button>
      {error && (
        <p className="text-xs text-error-content text-center">{error}</p>
      )}
    </BaseModal>
  );
}
