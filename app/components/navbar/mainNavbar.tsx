import { Suspense } from "react";
import { user } from "@/db/schemas/auth-schema";
import { getSession } from "@/app/actions/authActions";
import { LINKS } from "@/utils/constants";
import Brand from "./brand";
import Navlink from "./navlink";
import SigninButton from "./signinButton";
import { SignoutButton } from "./signoutButton";
import UserButton from "./userButton";
import {
  DarkModeToggle,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
} from "@barrelrolla/react-components-library";

export default async function MainNavbar() {
  const session = await getSession();
  return (
    <Navbar
      suppressHydrationWarning
      backdropClasses="bg-stone-800/30"
      collapseAt="md"
      glass={false}
      hasShadow={false}
      className="items-center bg-muted"
    >
      <div className="flex flex-row min-h-18 gap-4">
        <Brand />
      </div>
      <NavbarCollapse className="font-bold">
        {LINKS.map((link) => (
          <Navlink key={link.name} href={link.url}>
            {link.name}
          </Navlink>
        ))}
        {session && (
          <li>
            <SignoutButton />
          </li>
        )}
      </NavbarCollapse>
      <div className="flex flex-row justify-center items-center gap-4">
        <DarkModeToggle suppressHydrationWarning color="main" variant="ghost" />
        {!session && (
          <>
            <Suspense>
              <SigninButton />
            </Suspense>
          </>
        )}
        {session && (
          <UserButton user={session.user as typeof user.$inferSelect} />
        )}
        <NavbarToggle />
      </div>
    </Navbar>
  );
}
