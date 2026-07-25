"use client";

import { user as userSchema } from "@/db/schemas/auth-schema";
import UserAvatar from "../userAvatar";
import {
  Divider,
  Dropdown,
  DropdownContent,
  DropdownList,
  DropdownListItem,
  DropdownTrigger,
  useNavbarContext,
} from "@barrelrolla/react-components-library";
import { PiCaretDownBold, PiGear, PiSignOut, PiUser } from "react-icons/pi";
import placeholderImage from "@/public/user-placeholder.png";
import Link from "next/link";
import { useState } from "react";
import { SIGNOUT } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { authClient } from "@/auth/authClient";

export default function UserButton({
  user,
}: {
  user: typeof userSchema.$inferSelect;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const navbar = useNavbarContext();

  async function signout() {
    {
      await authClient.signOut({
        fetchOptions: {
          onRequest: () => {
            setIsLoading(true);
            setError("");
          },
          onSuccess: () => {
            setIsLoading(false);
            router.refresh();
          },
          onError: (ctx) => {
            setIsLoading(false);
            setError(ctx.error.message);
          },
        },
      });
    }
  }

  return (
    <Dropdown
      requireClick
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-start"
    >
      <DropdownTrigger>
        <button
          onClick={() => {
            navbar?.setIsOpen(false);
          }}
          className="flex items-center cursor-pointer gap-2"
        >
          <UserAvatar
            avatarUrl={user.image || placeholderImage.src}
            name={user.name || ""}
          />
          <PiCaretDownBold
            className={
              !isOpen
                ? "rotate- transition-transform"
                : " rotate-180 transition-transform"
            }
          />
        </button>
      </DropdownTrigger>
      <DropdownContent className="p-2">
        <DropdownList className="gap-1">
          <DropdownListItem
            className="p-6 sm:p-2"
            as={Link}
            href={`/user/${user.username}`}
          >
            <span className="flex items-center gap-2">
              <PiUser />
              Profile
            </span>
          </DropdownListItem>
          <DropdownListItem className="p-6 sm:p-2" as={Link} href={`/settings`}>
            <span className="flex items-center gap-2">
              <PiGear />
              Settings
            </span>
          </DropdownListItem>
          <Divider className="opacity-10 my-2" />
          <DropdownListItem
            className="p-6 sm:p-2"
            color="error"
            onClick={signout}
          >
            {error ? (
              error
            ) : isLoading ? (
              "working..."
            ) : (
              <span className="flex items-center gap-2">
                <PiSignOut />
                {SIGNOUT}
              </span>
            )}
          </DropdownListItem>
        </DropdownList>
      </DropdownContent>
    </Dropdown>
  );
}
