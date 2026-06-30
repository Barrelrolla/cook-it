"use client";
import { Button } from "@barrelrolla/react-components-library";

export default function LoginButton() {
  // const theme = useTheme();
  // const buttonColor: ColorType = theme?.isDark ? "dark" : "light";
  return (
    <Button
      color="main"
      variant="ghost"
      ghostHover="outline"
      onClick={() => {
        console.log("login");
      }}
    >
      Login
    </Button>
  );
}
