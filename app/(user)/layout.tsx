import { PropsWithChildren, Suspense } from "react";
import MainNavbar from "../components/navbar/mainNavbar";
import SigninModal from "../components/authModal/signinModal";
import ResetPasswordModal from "../components/authModal/resetPassModal";
import DisplayNameModal from "../components/authModal/displayNameModal";
import { user } from "@/db/schemas/auth-schema";
import { getSession } from "../actions/authActions";

export default async function UserLayout({ children }: PropsWithChildren) {
  const session = await getSession();

  return (
    <>
      <MainNavbar />
      <Suspense>
        <SigninModal />
      </Suspense>
      <Suspense>
        <ResetPasswordModal />
      </Suspense>
      {session && session.user && (
        <DisplayNameModal user={session.user as typeof user.$inferSelect} />
      )}
      <div className="mt-22">{children}</div>
    </>
  );
}
