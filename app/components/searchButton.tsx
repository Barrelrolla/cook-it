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
  Popover,
  PopoverContent,
  PopoverTrigger,
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
import { PiMagnifyingGlass, PiSliders } from "react-icons/pi";

export default function SearchButton({
  initialQuery = "",
  initialCategory,
  initialCuisine,
  initialDifficulty,
  initialDiet = [],
  showFilters,
  cuisines = [],
}: {
  initialQuery?: string;
  initialCategory?: string;
  initialCuisine?: string;
  initialDifficulty?: string;
  initialDiet?: string[];
  showFilters?: boolean;
  cuisines?: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string | undefined>(initialCategory);
  const [cuisine, setCuisine] = useState<string | undefined>(initialCuisine);
  const [difficulty, setDifficulty] = useState<string | undefined>(
    initialDifficulty,
  );
  const [diet, setDiet] = useState<string[]>(initialDiet);
  const [indexChanged, setIndexChanged] = useState(false);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (cleared) {
      submit();
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCleared(false);
  }, [cleared, submit]);

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
  const tShare = useTranslations("SharePage");
  const tRecipe = useTranslations("Recipes");
  const t = useTranslations("Search");

  function clear() {
    setCategory(undefined);
    setCuisine(undefined);
    setDifficulty(undefined);
    setDiet([]);
    setCleared(true);
    setIsOpen(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function submit() {
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

  const categoryIndex = categories.findIndex((c) => c.value === category);
  const difficultyIndex = difficulties.findIndex((d) => d.value === difficulty);
  const dietIndices = diets
    .map((d, i) => (diet.includes(d.value) ? i : undefined))
    .filter((d) => d !== undefined);

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
        {showFilters && (
          <Popover
            requireClick
            placement="bottom-end"
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            hasBackdrop
          >
            <PopoverTrigger>
              <div>
                <Tooltip>
                  <TooltipContent>{t("filters")}</TooltipContent>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      variant="outline"
                      aria-label={t("filters")}
                      startIcon={<PiSliders />}
                      onClick={() => setIsOpen(!isOpen)}
                      selected={isOpen}
                      useGroup={false}
                      size="xl"
                      radius="none"
                      scaling={false}
                    />
                  </TooltipTrigger>
                </Tooltip>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="border-containers rounded-containers overflow-clip"
              innerClassName="max-h-fit"
              backdropClassName="z-100"
              aria-label={t("filters")}
            >
              <div className="p-4 bg-main rounded-containers flex flex-col gap-2">
                <div>{t("filters")}</div>
                <div className="flex flex-col gap-4">
                  <Select
                    hasBackdrop
                    items={categories}
                    label={tShare("category-label")}
                    placeholder={tShare("category-placeholder")}
                    name="category"
                    showClearButton
                    initialSelectedIndex={
                      categoryIndex >= 0 ? categoryIndex : undefined
                    }
                    onSelectedIndexChange={(index) => {
                      if (index !== undefined) {
                        setCategory(categories[index].value);
                      } else {
                        setCategory(undefined);
                      }
                      setIndexChanged(true);
                    }}
                    useGroup={false}
                  >
                    <SelectContent
                      backdropClassName="z-200"
                      closeButtonAriaLabel={t("close")}
                    >
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
                    label={tShare("cuisine-label")}
                    placeholder={tShare("cuisine-placeholder")}
                    name="cuisine"
                    showClearButton
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    onSelectedIndexChange={() => {
                      setIndexChanged(true);
                    }}
                    useGroup={false}
                    toggleOpenAriaLabel={tShare("show-cuisines-aria-label")}
                    removeAllItemsAriaLabel={tShare("clear-cuisine")}
                  />
                  <Select
                    hasBackdrop
                    items={diets}
                    multiple
                    label={tShare("diet-label")}
                    placeholder={tShare("diet-placeholder")}
                    removeItemAriaLabel={tShare("remove-diet-aria-label")}
                    removeAllItemsAriaLabel={tShare(
                      "remove-all-diets-aria-label",
                    )}
                    name="diet"
                    initialSelectedIndices={dietIndices}
                    onSelectedIndexChange={(index) => {
                      if (index !== undefined) {
                        let newState = [];
                        const found = diet.indexOf(diets[index].value);
                        if (found >= 0) {
                          newState = diet.filter((_, i) => i !== found);
                        } else {
                          newState = [...diet, diets[index].value];
                        }
                        setDiet(newState);
                      } else {
                        setDiet([]);
                      }
                      setIndexChanged(true);
                    }}
                    useGroup={false}
                  >
                    <SelectContent
                      backdropClassName="z-200"
                      closeButtonAriaLabel={t("close")}
                    >
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
                    hasBackdrop
                    items={difficulties}
                    label={tShare("difficulty-label")}
                    placeholder={tShare("difficulty-placeholder")}
                    name="difficulty"
                    showClearButton
                    removeAllItemsAriaLabel={tShare("remove-difficulty")}
                    initialSelectedIndex={
                      difficultyIndex >= 0 ? difficultyIndex : undefined
                    }
                    onSelectedIndexChange={(index) => {
                      if (index !== undefined) {
                        setDifficulty(difficulties[index].value);
                      } else {
                        setDifficulty(undefined);
                      }
                      setIndexChanged(true);
                    }}
                    useGroup={false}
                  >
                    <SelectContent
                      backdropClassName="z-200"
                      closeButtonAriaLabel={t("close")}
                    >
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
                <Button type="button" onClick={clear} useGroup={false}>
                  {t("clear-all")}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
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
