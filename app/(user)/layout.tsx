import { PropsWithChildren } from "react";
import MainNavbar from "../components/navbar/mainNavbar";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MainNavbar />
      <div className="mt-22">{children}</div>
    </>
  );
}
