"use client";

import {
  Button,
  ButtonGroup,
  useTheme,
} from "@barrelrolla/react-components-library";

export default function ColorTest() {
  const themeContext = useTheme();
  const theme = themeContext?.theme || "";
  function changeTheme(newTheme: string) {
    themeContext?.setTheme(newTheme);
  }

  return (
    <div className="max-w-(--max-content-width) mx-4 md:mx-auto md:px-4 py-4 overflow-x-auto">
      <ButtonGroup variant="outline" size="xs">
        <Button
          selected={theme === "green"}
          onClick={() => {
            changeTheme("green");
          }}
        >
          green
        </Button>
        <Button
          selected={theme === "red"}
          onClick={() => {
            changeTheme("red");
          }}
        >
          red
        </Button>
        <Button
          selected={theme === "orange"}
          onClick={() => {
            changeTheme("orange");
          }}
        >
          orange
        </Button>
      </ButtonGroup>
    </div>
  );
}
