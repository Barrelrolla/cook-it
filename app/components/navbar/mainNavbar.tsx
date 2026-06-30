import {
  Button,
  DarkModeToggle,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "@barrelrolla/react-components-library";
import LoginButton from "./loginButton";
import Brand from "./brand";

export default function MainNavbar() {
  return (
    <Navbar
      glass={false}
      hasShadow={false}
      className="min-h-22 items-center pt-4 border-stone-200 dark:border-stone-700"
    >
      <div className="flex flex-row gap-4">
        <Brand />
      </div>
      <NavbarCollapse className="font-bold pt-4 md:pt-0">
        <NavbarLink
          selected
          className="selected:text-primary-content selected:underline-offset-16"
        >
          Home
        </NavbarLink>
        <NavbarLink className="underline-offset-2">Recipes</NavbarLink>
        <NavbarLink>Categories</NavbarLink>
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
