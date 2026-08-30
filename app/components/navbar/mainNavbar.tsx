import { Suspense } from "react";
import { getSession } from "@/app/actions/authActions";
import { formatNavLink, NAV_LINKS } from "@/constants";
import Brand from "./brand";
import Navlink from "./navlink";
import SigninButton from "./signinButton";
import UserButton from "./userButton";
import {
  Navbar,
  NavbarCollapse,
  NavbarMenu,
  NavbarToggle,
} from "barrelrolla-ui";
import { getTranslations } from "next-intl/server";
import ThemeToggleButton from "./themeToggleButton";

export default async function MainNavbar() {
  const session = await getSession();
  const t = await getTranslations("Navbar");
  const user = session ? JSON.parse(JSON.stringify(session.user)) : null;
  return (
    <Navbar
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
          {NAV_LINKS.map((link) => (
            <Navlink key={link} href={`/${link}`}>
              {formatNavLink(link)}
            </Navlink>
          ))}
        </NavbarMenu>
      </NavbarCollapse>
      <div className="flex flex-row justify-end items-center gap-1 min-w-48 min-h-14 md:min-h-18">
        <ThemeToggleButton ariaLabel={t("toggle-dark-mode")} />
        {!session && (
          <>
            <Suspense>
              <SigninButton />
            </Suspense>
          </>
        )}
        {session && <UserButton user={user} />}
        <NavbarToggle
          wrapperClassName="size-10 flex items-center"
          className="h-full w-full"
        />
      </div>
    </Navbar>
  );
}
