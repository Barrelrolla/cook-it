import { PropsWithChildren, Suspense } from "react";
import ResetPasswordModal from "../components/authModal/resetPassModal";
import SigninModal from "../components/authModal/signinModal";
import UsernameModal from "../components/authModal/usernameModal";
import MainNavbar from "../components/navbar/mainNavbar";

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
        <UsernameModal />
      </Suspense>
      <div className="mt-22">{children}</div>
    </>
  );
}
