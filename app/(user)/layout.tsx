import { PropsWithChildren, Suspense } from "react";
import MainNavbar from "../components/navbar/mainNavbar";
import LoginModal from "../components/loginModal/loginModal";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MainNavbar />
      <Suspense>
        <LoginModal />
      </Suspense>
      <div className="mt-22">{children}</div>
    </>
  );
}
