import {
  Button,
  DarkModeToggle,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "@barrelrolla/react-components-library";
import LoginButton from "../components/loginButton";
import LogoImage from "../../public/logo.svg";
import Image from "next/image";

export default function MainNavbar() {
  return (
    <Navbar
      // glass={false}
      hasShadow={false}
      className="min-h-22 items-center pt-4 border-stone-200 dark:border-stone-700"
    >
      <div className="flex flex-row gap-4">
        <NavbarBrand className="font-logo flex items-center gap-2">
          <span className="text-primary-content">
            <Image
              src={LogoImage}
              alt="logo depicting a chef's hat"
              className="h-10 w-10"
              priority
            />
          </span>
          CookIt
        </NavbarBrand>
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
