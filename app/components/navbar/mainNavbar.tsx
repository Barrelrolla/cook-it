import {
  Button,
  DarkModeToggle,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
} from "@barrelrolla/react-components-library";
import LoginButton from "./loginButton";
import Brand from "./brand";
import Navlink from "./navlink";

export default function MainNavbar() {
  return (
    <Navbar
      backdropClasses="bg-stone-800/30"
      collapseAt="md"
      glass={false}
      hasShadow={false}
      className="min-h-22 items-center pt-4 border-stone-200 dark:border-stone-700 z-40"
    >
      <div className="flex flex-row gap-4">
        <Brand />
      </div>
      <NavbarCollapse className="font-bold pt-4 md:pt-0">
        <Navlink href="/recipes">Recipes</Navlink>
        <Navlink href="/categories">Categories</Navlink>
        <li className="flex md:hidden flex-row justify-center items-center gap-4">
          <DarkModeToggle color="main" variant="ghost" />
          <LoginButton />
          <Button color="primary">Signup</Button>
        </li>
      </NavbarCollapse>
      <div className="hidden md:flex flex-row items-center gap-1 md:gap-2">
        <DarkModeToggle color="main" variant="ghost" />
        <LoginButton />
        <Button color="primary">Signup</Button>
      </div>
      <NavbarToggle />
    </Navbar>
  );
}
