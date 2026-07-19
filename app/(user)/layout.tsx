import { PropsWithChildren, Suspense } from "react";
import MainNavbar from "../components/navbar/mainNavbar";
import SigninModal from "../components/authModal/signinModal";
import ResetPasswordModal from "../components/authModal/resetPassModal";
import DisplayNameModal from "../components/authModal/displayNameModal";

export default async function UserLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Suspense>
        <MainNavbar />
      </Suspense>
      <Suspense>
        <SigninModal />
      </Suspense>
      <Suspense>
        <ResetPasswordModal />
      </Suspense>
      <Suspense>
        <DisplayNameModal />
      </Suspense>
      <div className="mt-22">{children}</div>
    </>
  );
}
