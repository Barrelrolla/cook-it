import { PropsWithChildren, Suspense } from "react";
import MainNavbar from "../components/navbar/mainNavbar";
import SigninModal from "../components/authModal/signinModal";
import ResetPasswordModal from "../components/authModal/resetPassModal";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MainNavbar />
      <Suspense>
        <SigninModal />
      </Suspense>
      <Suspense>
        <ResetPasswordModal />
      </Suspense>
      <div className="mt-22">{children}</div>
    </>
  );
}
