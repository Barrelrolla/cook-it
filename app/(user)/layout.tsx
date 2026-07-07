import { PropsWithChildren } from "react";
import MainNavbar from "../components/navbar/mainNavbar";
import LoginModal from "../components/loginModal/loginModal";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MainNavbar />
      <LoginModal />
      <div className="mt-22">{children}</div>
    </>
  );
}
