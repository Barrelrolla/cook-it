"use client";

import {
  Button,
  ButtonGroup,
  Input,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";

export default function SearchButton({
  initialQuery,
}: {
  initialQuery?: string | undefined;
}) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const t = useTranslations("Search");

  function submit() {
    router.push(`/recipes?query=${query}`);
  }
  return (
    <form action={submit}>
      <ButtonGroup
        wrapperClassName="px-2 justify-center w-[80%] w-full"
        className="w-full"
        size="xl"
        variant="solid"
        divider={false}
      >
        <Input
          wrapperClassName="w-full md:w-[80%] xl:w-[70%]"
          placeholder={t("search-placeholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Tooltip>
          <TooltipContent>{t("search")}</TooltipContent>
          <TooltipTrigger>
            <Button
              aria-label={t("search")}
              startIcon={<PiMagnifyingGlass />}
            />
          </TooltipTrigger>
        </Tooltip>
      </ButtonGroup>
    </form>
  );
}
