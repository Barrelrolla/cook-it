"use client";

import {
  Radio,
  RadioGroup,
  Spinner,
  useTheme,
} from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import { CSSProperties } from "react";

export default function AppearanceSettings() {
  const t = useTranslations("Settings.Appearance");
  const theme = useTheme();
  if (!theme || theme.darkMode === undefined) {
    return (
      <div className="h-20 overflow-clip">
        <Spinner className="mx-auto size-20" />
      </div>
    );
  }

  return (
    <div className="px-4">
      <RadioGroup title={t("color-theme")} name="colors" className="flex gap-8">
        <Radio
          style={{ "--fg-color": "var(--color-green)" } as CSSProperties}
          labelStyle={{ "--fg-color": "var(--color-green)" } as CSSProperties}
          defaultChecked={theme.theme === "green"}
          onChange={() => theme.setTheme("green")}
        >
          {t("green")}
        </Radio>
        <Radio
          style={{ "--fg-color": "var(--color-red)" } as CSSProperties}
          labelStyle={{ "--fg-color": "var(--color-red)" } as CSSProperties}
          defaultChecked={theme.theme === "red"}
          onChange={() => theme.setTheme("red")}
        >
          {t("red")}
        </Radio>
        <Radio
          style={{ "--fg-color": "var(--color-orange)" } as CSSProperties}
          labelStyle={{ "--fg-color": "var(--color-orange)" } as CSSProperties}
          defaultChecked={theme.theme === "orange"}
          onChange={() => theme.setTheme("orange")}
        >
          {t("orange")}
        </Radio>
      </RadioGroup>
      <RadioGroup
        title={t("dark-mode")}
        name="darkMode"
        className="flex gap-8 mt-6"
      >
        <Radio
          defaultChecked={theme.darkMode === "light"}
          onChange={() => theme.setDarkMode("light")}
        >
          {t("light")}
        </Radio>
        <Radio
          defaultChecked={theme.darkMode === "dark"}
          onChange={() => theme.setDarkMode("dark")}
        >
          {t("dark")}
        </Radio>
        <Radio
          defaultChecked={theme.darkMode === "system"}
          onChange={() => theme.setDarkMode("system")}
        >
          {t("system")}
        </Radio>
      </RadioGroup>
    </div>
  );
}
