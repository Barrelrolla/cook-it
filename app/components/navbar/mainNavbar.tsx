import {
  DarkModeToggle,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
} from "@barrelrolla/react-components-library";
import SigninButton from "./signinButton";
import Brand from "./brand";
import Navlink from "./navlink";
import { Suspense } from "react";
import { getSession } from "@/app/actions/authActions";
import { SignoutButton } from "./signoutButton";

export default async function MainNavbar() {
  const session = await getSession();
  return (
    <Navbar
      backdropClasses="bg-stone-800/30"
      collapseAt="md"
      glass={false}
      hasShadow={false}
      className="items-center"
      style={{ width: "calc(100% - var(--floating-ui-scrollbar-width))" }}
    >
      <div className="flex flex-row min-h-18 gap-4">
        <Brand />
      </div>
      <NavbarCollapse className="font-bold">
        <Navlink href="/recipes">Recipes</Navlink>
        <Navlink href="/categories">Categories</Navlink>
        <li className="flex flex-row justify-center items-center gap-4 md:ml-[calc(50vw-280px)]">
          <DarkModeToggle color="main" variant="ghost" />
          {!session && (
            <>
              <Suspense>
                <SigninButton />
              </Suspense>
              {/* <Suspense>
                <LoginButton signup />
              </Suspense> */}
            </>
          )}
          {session && <SignoutButton user={session.user} />}
        </li>
      </NavbarCollapse>
      {/* <div className="hidden md:flex flex-row items-center gap-1 md:gap-2">
        <DarkModeToggle color="main" variant="ghost" />
        {!session && (
          <>
            <Suspense>
              <LoginButton />
            </Suspense>
            <Suspense>
              <LoginButton signup />
            </Suspense>
          </>
        )}
        {session && (
          <>
            <LogoutButton user={session.user} />
          </>
        )}
      </div> */}
      <NavbarToggle />
    </Navbar>
  );
}
