"use client";
import { authClient } from "@/auth/authClient";
import { SOMETHING_WENT_WRONG } from "@/utils/constants";
import {
  Button,
  ButtonGroup,
  ButtonProps,
  Sidemenu,
  Spinner,
  useIsMobile,
} from "@barrelrolla/react-components-library";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useIsMobile();
  const contents = [AppearanceSettings, AccountSettings, SecuritySettings];
  const { data, isPending, error } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !data) {
      router.replace("/?signin=");
    }
  }, [isPending, data, router]);

  if (isPending) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    throw new Error(SOMETHING_WENT_WRONG);
  }

  if (!data) {
    return null;
  }

  return (
    <div className="max-w-(--max-content-width) mx-auto p-4">
      <h1 className="font-heading text-3xl">Settings</h1>
      <main className="flex flex-col sm:grid sm:grid-cols-4 gap-4">
        <Sidemenu wrapperClassName="col-span-1">
          <ButtonGroup
            className="w-full"
            divider={isMobile}
            variant="ghost"
            vertical={!isMobile}
          >
            <MenuButton
              index={0}
              activeIndex={activeTab}
              setActiveIndex={setActiveTab}
            >
              Appearance
            </MenuButton>
            <MenuButton
              index={1}
              activeIndex={activeTab}
              setActiveIndex={setActiveTab}
            >
              Account
            </MenuButton>
            <MenuButton
              index={2}
              activeIndex={activeTab}
              setActiveIndex={setActiveTab}
            >
              Security
            </MenuButton>
          </ButtonGroup>
        </Sidemenu>
        <div className="col-span-3">{contents[activeTab]()}</div>
      </main>
    </div>
  );
}

function MenuButton({
  index,
  activeIndex,
  setActiveIndex,
  children,
  ...rest
}: {
  index: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
} & ButtonProps<"button">) {
  return (
    <Button
      wrapperClassName="w-full"
      className="w-full justify-start"
      selected={index === activeIndex}
      onClick={() => {
        setActiveIndex(index);
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}

function AppearanceSettings() {
  return <h2>Appearance</h2>;
}
function AccountSettings() {
  return <h2>Account</h2>;
}
function SecuritySettings() {
  return <h2>Security</h2>;
}
