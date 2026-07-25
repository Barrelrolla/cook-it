"use client";

import { user as userSchema } from "@/db/schemas/auth-schema";
import UserAvatar from "../userAvatar";
import {
  Button,
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
      navbar?.setIsOpen(false);
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
        <span className="flex items-center cursor-pointer gap-2">
          <UserAvatar
            avatarUrl={user.image || placeholderImage.src}
            name={user.name || ""}
          />
          <PiCaretDownBold />
        </span>
      </DropdownTrigger>
      <DropdownContent className="p-6 sm:p-2">
        <DropdownList>
          <DropdownListItem
            as={Link}
            href={`/user/${user.username}`}
            onClick={() => {
              navbar?.setIsOpen(false);
              setIsOpen(false);
            }}
          >
            <span className="flex items-center gap-2">
              <PiUser />
              Profile
            </span>
          </DropdownListItem>
          <DropdownListItem
            as={Link}
            href={`/settings`}
            onClick={() => {
              navbar?.setIsOpen(false);
              setIsOpen(false);
            }}
          >
            <span className="flex items-center gap-2">
              <PiGear />
              Settings
            </span>
          </DropdownListItem>
          <Divider className="opacity-10" />
          <DropdownListItem
            color="error"
            // loading={isLoading}
            onClick={signout}
          >
            {isLoading ? (
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
