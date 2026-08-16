"use client";

import { Anchor } from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function SettingNotFound() {
  const t = useTranslations("Settings");
  return (
    <p>
      {t.rich("not-found", {
        settings: (chunks) => (
          <Anchor as={Link} href={"/settings"}>
            {chunks}
          </Anchor>
        ),
      })}
    </p>
  );
}
