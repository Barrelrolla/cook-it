import { PropsWithChildren } from "react";
import MainNavbar from "../components/navbar/mainNavbar";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MainNavbar />
      <main className="min-h-full mt-22">{children}</main>
    </>
  );
}
