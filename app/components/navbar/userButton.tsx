"use client";

import { Anchor } from "@barrelrolla/react-components-library";
import Link from "next/link";
import { user as userSchema } from "@/db/schemas/auth-schema";
import UserAvatar from "../userAvatar";
import { PiCaretDownBold } from "react-icons/pi";

export default function UserButton({
  user,
}: {
  user: typeof userSchema.$inferSelect;
}) {
  return (
    <div>
      <Anchor
        color="main"
        className="flex flex-row items-center gap-2"
        as={Link}
        href={`/user/${user.displayName?.toLowerCase()}`}
      >
        {user.image && (
          <UserAvatar
            avatarUrl={user.image}
            displayName={user.displayName || ""}
          />
        )}
        <PiCaretDownBold />
      </Anchor>
    </div>
  );
}
