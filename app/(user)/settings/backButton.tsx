"use client";

import { Button } from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { PiArrowLeft } from "react-icons/pi";

export default function BackButton() {
  const router = useRouter();
  const t = useTranslations("Settings");
  return (
    <Button
      color="main"
      className="-mx-2 mb-2"
      size="xs"
      variant="ghost"
      startIcon={<PiArrowLeft />}
      onClick={() => router.back()}
    >
      {t("back")}
    </Button>
  );
}
