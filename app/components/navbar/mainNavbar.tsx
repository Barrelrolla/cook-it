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
import { SignoutButton } from "./signoutButton";
import { LINKS } from "@/utils/constants";
import { getSession } from "@/app/actions/authActions";
import { user } from "@/db/schemas/auth-schema";
import UserButton from "./userButton";

export default async function MainNavbar() {
  const session = await getSession();
  return (
    <Navbar
      backdropClasses="bg-stone-800/30"
      collapseAt="md"
      glass={false}
      hasShadow={false}
      className="items-center"
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
      <div className="flex flex-row justify-center items-center gap-4 md:ml-[calc(50vw-280px)]">
        <DarkModeToggle color="main" variant="ghost" />
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
      </div>
      <NavbarToggle />
    </Navbar>
  );
}
