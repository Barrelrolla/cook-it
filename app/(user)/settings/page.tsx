"use client";
import { authClient } from "@/auth/authClient";
import { SOMETHING_WENT_WRONG } from "@/utils/constants";
import {
  Sidemenu,
  SidemenuItem,
  SidemenuSection,
  Spinner,
} from "@barrelrolla/react-components-library";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);

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
    <div className="max-w-(--max-content-width) mx-auto p-4 w-auto">
      <h1 className="font-heading text-3xl">Settings</h1>
      <main className="flex flex-col sm:grid sm:grid-cols-3 md:grid-cols-4 gap-4">
        <Sidemenu
          className="max-h-[calc(100vh-142px)]"
          initialActiveIndex={activeTab}
          onActiveIndexChange={setActiveTab}
          wrapperClassName="col-span-1"
        >
          <SidemenuSection>
            {contentNames.map((name, index) => {
              return (
                <SidemenuItem key={name} index={index}>
                  {name}
                </SidemenuItem>
              );
            })}
          </SidemenuSection>
        </Sidemenu>
        <div className="col-span-2 md:col-span-3">{contents[activeTab]()}</div>
      </main>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div>
      <h2>Profile</h2>
      <div>Photo</div>
      <div>name</div>
    </div>
  );
}
function AccountSettings() {
  return (
    <div>
      <h2>Account</h2>
      <div>Password</div>
      <div>Email</div>
    </div>
  );
}
function ConnectedSettings() {
  return (
    <div>
      <h2>Conntected Seriveces</h2>
      <div>Google</div>
      <div>Apple</div>
    </div>
  );
}
function AppearanceSettings() {
  return (
    <div>
      <h2>Appearance</h2>
      <div>Color theme</div>
      <div>Dark mode</div>
    </div>
  );
}
function DataSettings() {
  return (
    <div>
      <h2>Data</h2>
      <div>Download your data</div>
      <div className="text-error-content">Delete account</div>
    </div>
  );
}
