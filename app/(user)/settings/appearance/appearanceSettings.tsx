"use client";

import {
  Radio,
  RadioGroup,
  Spinner,
  useTheme,
} from "@barrelrolla/react-components-library";
import { CSSProperties } from "react";

export default function AppearanceSettings() {
  const theme = useTheme();
  if (!theme || theme.darkMode === undefined) {
    return (
      <div className="h-20 overflow-clip">
        <Spinner className="size-20" />
      </div>
    );
  }

  return (
    <div>
      <RadioGroup title="Color theme" name="colors" className="flex gap-8">
        <Radio
          style={{ "--fg-color": "var(--color-green)" } as CSSProperties}
          labelStyle={{ "--fg-color": "var(--color-green)" } as CSSProperties}
          defaultChecked={theme.theme === "green"}
          onChange={() => theme.setTheme("green")}
        >
          {"Green (default)"}
        </Radio>
        <Radio
          style={{ "--fg-color": "var(--color-red)" } as CSSProperties}
          labelStyle={{ "--fg-color": "var(--color-red)" } as CSSProperties}
          defaultChecked={theme.theme === "red"}
          onChange={() => theme.setTheme("red")}
        >
          Red
        </Radio>
        <Radio
          style={{ "--fg-color": "var(--color-orange)" } as CSSProperties}
          labelStyle={{ "--fg-color": "var(--color-orange)" } as CSSProperties}
          defaultChecked={theme.theme === "orange"}
          onChange={() => theme.setTheme("orange")}
        >
          Orange
        </Radio>
      </RadioGroup>
      <RadioGroup title="Dark mode" name="darkMode" className="flex gap-8 mt-6">
        <Radio
          defaultChecked={theme.darkMode === "light"}
          onChange={() => theme.setDarkMode("light")}
        >
          Light
        </Radio>
        <Radio
          defaultChecked={theme.darkMode === "dark"}
          onChange={() => theme.setDarkMode("dark")}
        >
          Dark
        </Radio>
        <Radio
          defaultChecked={theme.darkMode === "system"}
          onChange={() => theme.setDarkMode("system")}
        >
          System
        </Radio>
      </RadioGroup>
    </div>
  );
}
