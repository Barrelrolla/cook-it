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
import {
  checkDisplayNameAvailability,
  setUserDisplayName,
} from "@/app/actions/userActions";

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

  async function action(formData: FormData) {
    const enteredName = formData.get("display-name")?.toString() || "";
    setName(enteredName);
    setLoading(true);

    const Name = z.object({ displayName: displayNameSchema }).refine(
      async (data) => {
        return await checkDisplayNameAvailability(data.displayName);
      },
      { path: ["display-name"], message: "Display name is already in use" },
    );
    const parsedName = await Name.safeParseAsync({ displayName: enteredName });
    if (!parsedName.data) {
      if (parsedName.error.issues.length > 0) {
        setError(parsedName.error.issues[0].message);
      } else {
        setError(SOMETHING_WENT_WRONG);
      }
      setLoading(false);
      return;
    }

    try {
      await setUserDisplayName(parsedName.data.displayName, user.id);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(SOMETHING_WENT_WRONG);
    }
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
        error={error}
        defaultValue={name}
      />
      <Button type="submit" disabled={loading} className="w-full" size="sm">
        Confirm display name
      </Button>
    </BaseModal>
  );
}
