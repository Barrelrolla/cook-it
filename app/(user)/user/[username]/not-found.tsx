"use client";

import Link from "next/link";
import { Anchor } from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";

export default function UserNotFound() {
  const t = useTranslations("UserPage");
  return (
    <main>
      {t.rich("not-found", {
        home: (chunks) => (
          <Anchor as={Link} href="/">
            {chunks}
          </Anchor>
        ),
      })}
    </main>
  );
}
