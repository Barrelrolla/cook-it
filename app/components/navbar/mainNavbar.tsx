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
        {LINKS.map((link) => (
          <Navlink key={link.name} href={link.url}>
            {link.name}
          </Navlink>
        ))}
        <li className="flex flex-row justify-center items-center gap-4 md:ml-[calc(50vw-280px)]">
          <DarkModeToggle color="main" variant="ghost" />
          {!session && (
            <>
              <Suspense>
                <SigninButton />
              </Suspense>
            </>
          )}
          {session && (
            <SignoutButton user={session.user as typeof user.$inferSelect} />
          )}
        </li>
      </NavbarCollapse>
      <NavbarToggle />
    </Navbar>
  );
}
