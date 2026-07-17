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
import { authClient } from "@/auth/authClient";

export default async function MainNavbar() {
  const { data } = await authClient.getSession();
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
          {!data && (
            <>
              <Suspense>
                <SigninButton />
              </Suspense>
            </>
          )}
          {data && <SignoutButton user={data.user} />}
        </li>
      </NavbarCollapse>
      <NavbarToggle />
    </Navbar>
  );
}
