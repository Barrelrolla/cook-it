import { PropsWithChildren } from "react";
import MainNavbar from "../components/mainNavbar";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-full flex flex-col">
      <MainNavbar />
      <div className="mt-22">{children}</div>
    </main>
  );
}
