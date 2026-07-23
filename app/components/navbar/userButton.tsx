"use client";

import Link from "next/link";
import { user as userSchema } from "@/db/schemas/auth-schema";
import UserAvatar from "../userAvatar";
import {
  Anchor,
  useNavbarContext,
} from "@barrelrolla/react-components-library";
import { PiCaretDownBold } from "react-icons/pi";

export default function UserButton({
  user,
}: {
  user: typeof userSchema.$inferSelect;
}) {
  const navbar = useNavbarContext();
  return (
    <div>
      <Anchor
        onClick={() => navbar?.setIsOpen(false)}
        color="main"
        className="flex flex-row items-center gap-2"
        as={Link}
        href={`/user/${user.username}`}
      >
        {user.image && (
          <UserAvatar avatarUrl={user.image} name={user.name || ""} />
        )}
        <PiCaretDownBold />
      </Anchor>
    </div>
  );
}
