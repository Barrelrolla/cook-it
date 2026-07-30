"use client";

import {
  Sidemenu,
  SidemenuItem,
  SidemenuSection,
  useIsMobile,
} from "@barrelrolla/react-components-library";
import { usePathname, useRouter } from "next/navigation";
import { CSSProperties } from "react";
import { SETTINGS_CATEGORIES } from "./settingsCategories";

export default function SettingsSideMenu() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const path = usePathname();

  return (
    <div>
      <Sidemenu
        wrapperStyle={{ "--bg-color": "var(--color-muted)" } as CSSProperties}
        className="max-h-[calc(100vh-142px)]"
        wrapperClassName="col-span-1 not-sm:rounded-navigation not-sm:border-l-0 not-sm:border-r-0"
      >
        <SidemenuSection radius={isMobile ? "none" : "default"}>
          {SETTINGS_CATEGORIES.map((cat, index) => {
            return (
              <SidemenuItem
                selected={path.startsWith(`/settings/${cat.slug}`)}
                onClick={() => {
                  router.push(`/settings/${cat.slug}`);
                }}
                key={cat.slug}
                index={index}
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
