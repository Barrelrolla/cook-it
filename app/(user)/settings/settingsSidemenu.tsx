"use client";

import {
  Sidemenu,
  SidemenuItem,
  SidemenuSection,
  useIsMobile,
} from "@barrelrolla/react-components-library";
import { usePathname } from "next/navigation";
import { CSSProperties } from "react";
import { SETTINGS_CATEGORIES } from "./settingsCategories";
import Link from "next/link";

export default function SettingsSideMenu() {
  const isMobile = useIsMobile();
  const path = usePathname();

  const foundIndex = SETTINGS_CATEGORIES.findIndex((item) => {
    return path.includes(`${item.slug}`);
  });
  return (
    <div>
      <Sidemenu
        fillOnSelect
        initialActiveIndex={foundIndex < 0 ? 0 : foundIndex}
        wrapperStyle={{ "--bg-color": "var(--color-muted)" } as CSSProperties}
        className="max-h-[calc(100vh-142px)]"
        wrapperClassName="col-span-1 not-sm:rounded-navigation not-sm:border-l-0 not-sm:border-r-0"
      >
        <SidemenuSection radius={isMobile ? "none" : "default"}>
          {SETTINGS_CATEGORIES.map((cat, index) => {
            return (
              <SidemenuItem
                key={cat.slug}
                index={index}
                as={Link}
                href={`/settings/${cat.slug}`}
              >
                {cat.name}
              </SidemenuItem>
            );
          })}
        </SidemenuSection>
      </Sidemenu>
    </div>
  );
}
