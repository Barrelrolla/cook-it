"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/auth/authClient";
import z from "zod";
import {
  CHOOSE_DISPLAY_NAME_PARAM,
  SOMETHING_WENT_WRONG,
} from "@/utils/constants";
import BaseModal from "../baseModal";
import { usernameSchema } from "@/utils/validationSchemas";
import { Button, Input } from "@barrelrolla/react-components-library";
import { PiUserBold } from "react-icons/pi";

export default function UsernameModal() {
  const session = authClient.useSession();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
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

    const Name = z.object({ username: usernameSchema });
    const parsedName = await Name.safeParseAsync({ username: enteredName });
    if (!parsedName.data) {
      if (parsedName.error.issues.length > 0) {
        setError(parsedName.error.issues[0].message);
      } else {
        setError(SOMETHING_WENT_WRONG);
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
          setError(ctx.error.message || SOMETHING_WENT_WRONG);
        },
      },
    });
  }

  return (
    <BaseModal
      title="Choose your username"
      formAction={action}
      isOpen={isOpen}
      setIsOpen={close}
    >
      <Input
        required
        disabled={loading}
        startIcon={<PiUserBold />}
        aria-label="username"
        type="text"
        placeholder="username"
        id="username"
        name="username"
        autoComplete="username"
        error={error}
        defaultValue={name}
      />
      <Button type="submit" disabled={loading} className="w-full" size="sm">
        Confirm username
      </Button>
    </BaseModal>
  );
}
