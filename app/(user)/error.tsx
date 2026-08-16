"use client";

import { useTranslations } from "next-intl";

export default function ErrorPage({ error }: { error: { message: string } }) {
  const t = useTranslations("Global");
  return (
    <div>
      <p>{t("something-went-wrong")}</p>
      <p>{error.message}</p>
    </div>
  );
}
