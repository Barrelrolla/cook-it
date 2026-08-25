import { PropsWithChildren, Suspense } from "react";
import ResetPasswordModal from "../components/authModal/resetPassModal";
import SigninModal from "../components/authModal/signinModal";
import UsernameModal from "../components/authModal/usernameModal";
import MainNavbar from "../components/navbar/mainNavbar";
import MainFooter from "../components/footer/footer";

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
      <div className="min-h-screen flex flex-col">
        <div className="mt-18 md:mt-22 flex-1">{children}</div>
        <MainFooter />
      </div>
    </>
  );
}
