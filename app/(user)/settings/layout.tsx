"use client";
import { authClient } from "@/auth/authClient";
import { SOMETHING_WENT_WRONG } from "@/utils/constants";
import {
  Sidemenu,
  SidemenuItem,
  SidemenuSection,
  Spinner,
  useIsMobile,
} from "@barrelrolla/react-components-library";
import { usePathname, useRouter } from "next/navigation";
import { CSSProperties, PropsWithChildren, useEffect, useState } from "react";
import { user as userSchema } from "@/db/schemas/auth-schema";
import ProfileSettings from "./profile/page";

export default function SettingsPage({ children }: PropsWithChildren) {
  const [activeTab, setActiveTab] = useState(-1);

  const contents = [
    ProfileSettings,
    AccountSettings,
    ConnectedSettings,
    AppearanceSettings,
    DataSettings,
  ];
  const contentNames = [
    "Profile",
    "Account",
    "Connected Services",
    "Appearance",
    "Data",
  ];

  const ActiveTabComponent = contents[activeTab];

  const router = useRouter();
  const path = usePathname();
  const isMobile = useIsMobile();
  const { data, isPending, error } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !data) {
      router.replace("/?signin=");
    }
  }, [isPending, data, router, error]);

  if (isPending) {
    return (
      <main className="flex justify-center items-center mt-22">
        <Spinner className="text-9xl" />
      </main>
    );
  }

  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="max-w-(--max-content-width) mx-auto w-auto">
      <h1 className="font-heading text-4xl py-4 px-6">Settings</h1>
      <main className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 sm:pl-4">
        <div>
          <Sidemenu
            wrapperStyle={
              { "--bg-color": "var(--color-muted)" } as CSSProperties
            }
            className="max-h-[calc(100vh-142px)]"
            initialActiveIndex={activeTab}
            onActiveIndexChange={setActiveTab}
            wrapperClassName="col-span-1 not-sm:rounded-navigation not-sm:border-l-0 not-sm:border-r-0"
          >
            <SidemenuSection radius={isMobile ? "none" : "default"}>
              {contentNames.map((name, index) => {
                return (
                  <SidemenuItem
                    selected={path.startsWith(
                      `/settings/${name.toLowerCase()}`,
                    )}
                    onClick={() => {
                      router.push("/settings/" + name.toLowerCase());
                    }}
                    key={name}
                    index={index}
                  >
                    {name}
                  </SidemenuItem>
                );
              })}
            </SidemenuSection>
          </Sidemenu>
        </div>
        <div className="col-span-2 md:col-span-3 px-4 py-4 sm:py-0">
          {children}
          {/* {data.user && (
            <ActiveTabComponent
              user={data.user as typeof userSchema.$inferSelect}
            />
          )} */}
        </div>
      </main>
    </div>
  );
}

function AccountSettings({ user }: { user: typeof userSchema.$inferSelect }) {
  return (
    <div>
      <h2>Account</h2>
      <div>Password</div>
      <div>Email</div>
    </div>
  );
}
function ConnectedSettings({ user }: { user: typeof userSchema.$inferSelect }) {
  return (
    <div>
      <h2>Conntected Seriveces</h2>
      <div>Google</div>
      <div>Apple</div>
    </div>
  );
}
function AppearanceSettings({
  user,
}: {
  user: typeof userSchema.$inferSelect;
}) {
  return (
    <div>
      <h2>Appearance</h2>
      <div>Color theme</div>
      <div>Dark mode</div>
    </div>
  );
}
function DataSettings({ user }: { user: typeof userSchema.$inferSelect }) {
  return (
    <div>
      <h2>Data</h2>
      <div>Download your data</div>
      <div className="text-error-content">Delete account</div>
    </div>
  );
}
