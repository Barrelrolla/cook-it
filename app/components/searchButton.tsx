"use client";

import {
  recipeCategoryEnum,
  recipeDifficultyEnum,
  restrictedDietEnum,
} from "@/db/schemas/recipe-schema";
import {
  Button,
  ButtonGroup,
  Combobox,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectOption,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";

export default function SearchButton({
  initialQuery = "",
  showFilters,
  cuisines = [],
}: {
  initialQuery?: string;
  showFilters?: boolean;
  cuisines?: string[];
}) {
  const [query, setQuery] = useState(initialQuery);
  const [indexChanged, setIndexChanged] = useState(false);

  useEffect(() => {
    if (indexChanged) {
      formRef.current?.requestSubmit();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIndexChanged(false);
    }
  }, [indexChanged]);

  const formRef = useRef<HTMLFormElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const tRecipe = useTranslations("Recipes");
  const t = useTranslations("Search");

  function submit(formData: FormData) {
    const category = formData.get("category")?.toString() || "";
    const difficulty = formData.get("difficulty")?.toString() || "";
    const cuisine = formData.get("cuisine")?.toString() || "";
    const diet = formData.getAll("diet") || [];
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    params.delete("query");
    params.delete("category");
    params.delete("difficulty");
    params.delete("cuisine");
    params.delete("diet");
    if (query) {
      params.set("query", query);
    }
    if (category) {
      params.set("category", category);
    }
    if (difficulty) {
      params.set("difficulty", difficulty);
    }
    if (cuisine) {
      params.set("cuisine", cuisine);
    }
    if (diet) {
      diet.forEach((d) => {
        params.append("diet", d.toString());
      });
    }
    router.push(`/recipes?${params.toString()}`);
  }

  const categories = recipeCategoryEnum.enumValues.map((cat) => {
    return { name: tRecipe(`Categories.${cat}`), value: cat };
  });
  const difficulties = recipeDifficultyEnum.enumValues.map((diff) => {
    return { name: tRecipe(`Difficulty.${diff}`), value: diff };
  });

  const diets = restrictedDietEnum.enumValues.map((diet) => {
    return { name: tRecipe(`Diet.${diet}`), value: diet };
  });
  const cuisineItems = cuisines.map((cuisine) => {
    return { name: cuisine, value: cuisine };
  });

  return (
    <form action={submit} ref={formRef}>
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
      {showFilters && (
        <div className="px-2">
          <div>filters</div>
          <div className="flex gap-4">
            <Select
              items={categories}
              label="category"
              name="category"
              showClearButton
              onSelectedIndexChange={() => {
                setIndexChanged(true);
              }}
            >
              <SelectContent>
                <SelectGroup>
                  {categories.map((cat, index) => (
                    <SelectOption key={cat.value} index={index}>
                      {cat.name}
                    </SelectOption>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Combobox
              items={cuisineItems}
              label="cuisine"
              name="cuisine"
              showClearButton
              onSelectedIndexChange={() => {
                setIndexChanged(true);
              }}
            />
            <Select
              items={diets}
              multiple
              label="diet"
              name="diet"
              onSelectedIndexChange={() => {
                setIndexChanged(true);
              }}
            >
              <SelectContent>
                <SelectGroup>
                  {diets.map((diet, index) => {
                    return (
                      <SelectOption index={index} key={diet.value}>
                        {diet.name}
                      </SelectOption>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              items={difficulties}
              label="difficulty"
              name="difficulty"
              showClearButton
              onSelectedIndexChange={() => {
                setIndexChanged(true);
              }}
            >
              <SelectContent>
                <SelectGroup>
                  {difficulties.map((diff, index) => (
                    <SelectOption key={diff.value} index={index}>
                      {diff.name}
                    </SelectOption>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </form>
  );
}
