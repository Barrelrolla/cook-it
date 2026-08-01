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
  DropdownTitle,
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
import DestructiveModal from "../destructiveModal";

export default function UserButton({
  user,
}: {
  user: typeof userSchema.$inferSelect;
}) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
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
    <>
      <DestructiveModal
        isOpen={isConfirmationOpen}
        setIsOpen={setIsConfirmationOpen}
        title={SIGNOUT}
        action={signout}
      />
      <Dropdown
        requireClick
        strategy="fixed"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="bottom-end"
      >
        <DropdownTrigger>
          <Button
            variant="ghost"
            color="main"
            onClick={() => {
              navbar?.setIsOpen(false);
            }}
            className="flex p-2 items-center cursor-pointer gap-2 h-10"
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
          </Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownTitle className="sm:hidden">{user.name}</DropdownTitle>
          <Divider className="opacity-10 my-2 sm:hidden" />
          <DropdownList>
            <DropdownListItem as={Link} href={`/user/${user.username}`}>
              <span>
                <PiUser className="inline mr-4 sm:mr-2" />
                Profile
              </span>
            </DropdownListItem>
            <DropdownListItem as={Link} href={`/settings`}>
              <span>
                <PiGear className="inline mr-4 sm:mr-2" />
                Settings
              </span>
            </DropdownListItem>
            <Divider className="opacity-10 my-2" />
            <DropdownListItem
              color="error"
              onClick={() => {
                setIsConfirmationOpen(true);
              }}
            >
              {error ? (
                error
              ) : isLoading ? (
                "working..."
              ) : (
                <span>
                  <PiSignOut className="inline mr-4 sm:mr-2" />
                  {SIGNOUT}
                </span>
              )}
            </DropdownListItem>
          </DropdownList>
        </DropdownContent>
      </Dropdown>
    </>
  );
}
