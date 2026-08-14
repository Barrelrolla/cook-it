import { Suspense } from "react";
import { user } from "@/db/schemas/auth-schema";
import { getSession } from "@/app/actions/authActions";
import { LINKS } from "@/utils/constants";
import Brand from "./brand";
import Navlink from "./navlink";
import SigninButton from "./signinButton";
import UserButton from "./userButton";
import {
  DarkModeToggle,
  Navbar,
  NavbarCollapse,
  NavbarMenu,
  NavbarToggle,
} from "@barrelrolla/react-components-library";

export default async function MainNavbar() {
  const session = await getSession();
  return (
    <Navbar
      suppressHydrationWarning
      backdropClassName="bg-stone-800/30 backdrop-blur-[2px]"
      collapseAt="md"
      glass={false}
      hasShadow={false}
      className="items-center bg-muted"
    >
      <div className="flex flex-row min-h-14 md:min-h-18 gap-4">
        <Brand />
      </div>
      <NavbarCollapse className="font-bold">
        <NavbarMenu>
          {LINKS.map((link) => (
            <Navlink key={link.name} href={link.url}>
              {link.name}
            </Navlink>
          ))}
        </NavbarMenu>
      </NavbarCollapse>
      <div className="flex flex-row justify-end items-center gap-1 min-w-48 min-h-14 md:min-h-18">
        <DarkModeToggle color="main" variant="ghost" className="size-10" />
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
        <NavbarToggle
          wrapperClassName="size-10 flex items-center"
          className="h-full w-full"
        />
      </div>
    </Navbar>
  );
}
