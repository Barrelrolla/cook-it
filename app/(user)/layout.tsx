import { PropsWithChildren, Suspense } from "react";
import MainNavbar from "../components/navbar/mainNavbar";
import SigninModal from "../components/signinModal/signinModal";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MainNavbar />
      <Suspense>
        <SigninModal />
      </Suspense>
      <div className="mt-22">{children}</div>
    </>
  );
}
