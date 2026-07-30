import { PropsWithChildren } from "react";
import SettingsSideMenu from "./settingsSidemenu";
import { getSession } from "@/app/actions/authActions";
import { redirect } from "next/navigation";

export default async function SettingsPage({ children }: PropsWithChildren) {
  const session = await getSession();
  if (!session) {
    redirect("/?signin=");
  }

  return (
    <div className="max-w-(--max-content-width) mx-auto w-auto">
      <h1 className="font-heading text-4xl py-4 px-6">Settings</h1>
      <main className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 sm:pl-4">
        <SettingsSideMenu />
        <div className="col-span-2 md:col-span-3 px-4 py-4 sm:py-0">
          {children}
        </div>
      </main>
    </div>
  );
}
