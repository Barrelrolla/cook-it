"use client";

import { Button, ButtonGroup } from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useOptimistic } from "react";

export function UserRecipeBar({ isCurrentUser }: { isCurrentUser: boolean }) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  const [optimisticSaved, setOptimisticSaved] = useOptimistic(
    searchParams.has("saved"),
  );

  const changeTab = (saved: boolean) => {
    const params = new URLSearchParams(searchParams);

    if (saved) {
      params.set("saved", "");
    } else {
      params.delete("saved");
    }

    startTransition(() => {
      setOptimisticSaved(saved);
      router.replace(`${path}?${params}`, { scroll: false });
    });
  };

  const t = useTranslations("UserPage");

  return (
    <ButtonGroup size="lg" className="px-4" divider={isCurrentUser}>
      <Button
        as={isCurrentUser ? "button" : "div"}
        className={!isCurrentUser ? "pointer-events-none" : ""}
        selected={!optimisticSaved}
        onClick={() => changeTab(false)}
      >
        {isCurrentUser ? t("my-recipes") : t("uploaded-recipes")}
      </Button>
      {isCurrentUser && (
        <Button selected={optimisticSaved} onClick={() => changeTab(true)}>
          {t("saved-recipes")}
        </Button>
      )}
    </ButtonGroup>
  );
}
