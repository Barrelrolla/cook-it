"use client";

import { Button, ButtonGroup } from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function UserRecipeBar({ isCurrentUser }: { isCurrentUser: boolean }) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  const t = useTranslations("UserPage");

  return (
    <ButtonGroup size="lg" className="px-4" divider={isCurrentUser}>
      <Button
        as={isCurrentUser ? "button" : "div"}
        className={!isCurrentUser ? "pointer-events-none" : ""}
        selected={!searchParams.has("saved")}
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.delete("saved");
          router.replace(`${path}?${params}`, { scroll: false });
        }}
      >
        {isCurrentUser ? t("my-recipes") : t("uploaded-recipes")}
      </Button>
      {isCurrentUser && (
        <Button
          selected={searchParams.has("saved")}
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.set("saved", "");
            router.replace(`${path}?${params}`, { scroll: false });
          }}
        >
          {t("saved-recipes")}
        </Button>
      )}
    </ButtonGroup>
  );
}
