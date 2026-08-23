"use client";

import { getCuisineId } from "@/app/actions/cuisineActions";
import {
  addRecipe,
  RecipeWithRelations,
  updateRecipe,
} from "@/app/actions/recipeActions";
import ImagePicker from "@/app/components/imagePicker";
import { User } from "@/db/schemas/auth-schema";
import {
  recipeCategoryEnum,
  recipeDifficultyEnum,
  restrictedDietEnum,
} from "@/db/schemas/recipe-schema";
import placeholderImage from "@/public/recipe-placeholder.png";
import {
  convertDurationToMinutes,
  getUniqueRecipeSlug,
  IS_DEV,
  uploadRecipeImage,
} from "@/utils/helpers";
import { createRecipeValidation } from "@/utils/validationSchemas";
import {
  Button,
  ButtonGroup,
  Card,
  Combobox,
  Input,
  Select,
  SelectContent,
  SelectOption,
} from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  PiClock,
  PiFloppyDisk,
  PiForkKnife,
  PiPaperPlaneTiltBold,
  PiTrash,
} from "react-icons/pi";
import { $ZodIssue } from "zod/v4/core";

export default function ShareForm({
  recipe,
  cuisines,
  user,
}: {
  recipe?: RecipeWithRelations;
  cuisines: string[];
  user: User;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const [ingredients, setIngredients] = useState(
    recipe?.ingredients ?? ["", ""],
  );
  const [instructions, setInstructions] = useState(
    recipe?.instructions ?? ["", ""],
  );
  const [title, setTitle] = useState(recipe?.title ?? "");
  const [description, setDescription] = useState(recipe?.description ?? "");
  const [prepTime, setPrepTime] = useState(recipe?.prepTime ?? "");
  const [cookTime, setCookTime] = useState(recipe?.cookTime ?? "");
  const [servings, setServings] = useState(recipe?.servings ?? "");
  const [error, setError] = useState("");
  const [issues, setIssues] = useState<$ZodIssue[]>([]);
  const router = useRouter();
  const tGlobal = useTranslations("Global");
  const tCat = useTranslations("Recipes.Categories");
  const tDiff = useTranslations("Recipes.Difficulty");
  const tDiet = useTranslations("Recipes.Diet");
  const tVal = useTranslations("Validation");
  const t = useTranslations("SharePage");
  const categories = recipeCategoryEnum.enumValues.map((cat) => {
    return { name: tCat(cat), value: cat };
  });
  const difficulties = recipeDifficultyEnum.enumValues.map((diff) => {
    return {
      name: tDiff(diff),
      value: diff,
    };
  });
  const diets = restrictedDietEnum.enumValues.map((diet) => {
    return { name: tDiet(diet), value: diet };
  });
  const cuisineItems = cuisines.map((cuisine) => {
    return { name: cuisine, value: cuisine };
  });

  const timeUnits = [
    { name: t("minutes"), value: "minutes" },
    { name: t("hours"), value: "hours" },
    { name: t("days"), value: "days" },
  ];

  const ingredientsError = issues.find(
    (issue) => issue.path[0] === "ingredients" && issue.path[1] === undefined,
  )?.message;
  const instructionsError = issues.find(
    (issue) => issue.path[0] === "instructions" && issue.path[1] === undefined,
  )?.message;

  async function saveData(formData: FormData) {
    const titleInput = formData.get("title")?.toString() || "";
    const descriptionInput = formData.get("description")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const cuisineInput = formData.get("cuisine")?.toString() || "";
    const difficulty = formData.get("difficulty")?.toString() || "";
    const prepTimeInput = formData.get("prep-time")?.toString() || "";
    const prepUnit = formData.get("prep-unit")?.toString() || "";
    const cookTimeInput = formData.get("cook-time")?.toString() || "";
    const cookUnit = formData.get("cook-unit")?.toString() || "";
    const servingsInput = formData.get("servings")?.toString() || "";
    const diets = formData.getAll("diet") || [];
    const cuisine = await getCuisineId(cuisineInput);

    setTitle(titleInput);
    setDescription(descriptionInput);
    setPrepTime(prepTimeInput);
    setCookTime(cookTimeInput);
    setServings(servingsInput);
    setError("");
    setIssues([]);

    try {
      const validatedRecipe = createRecipeValidation(tVal).safeParse({
        title: titleInput,
        description: descriptionInput,
        category,
        cuisineId: cuisine?.id,
        difficulty: difficulty || null,
        prepTime: prepTimeInput,
        cookTime: cookTimeInput,
        servings: servingsInput,
        diets,
        ingredients,
        instructions,
      });

      const { data } = validatedRecipe;

      if (!data) {
        setIssues(validatedRecipe.error.issues);
        return;
      }

      const slug = recipe?.slug ?? getUniqueRecipeSlug(data.title);
      let uploadedImageUrl = "";
      if (file) {
        try {
          const uploadedImageData = await uploadRecipeImage(slug, file);
          if (uploadedImageData.secure_url) {
            uploadedImageUrl = uploadedImageData.secure_url;
          } else {
            setError(tGlobal("something-went-wrong"));
            return;
          }
        } catch (err) {
          if (IS_DEV) {
            console.error(err);
          }
          setError(tGlobal("something-went-wrong"));
        }
      } else {
        uploadedImageUrl = recipe?.imageUrl ?? placeholderImage.src;
      }

      const recipeData = {
        title: data.title,
        slug,
        imageUrl: uploadedImageUrl,
        description: data.description,
        category: data.category,
        cuisineId: data.cuisineId,
        difficulty: data.difficulty,
        ingredients,
        instructions,
        cookTime: data.cookTime
          ? convertDurationToMinutes(
              data.cookTime,
              cookUnit as "minutes" | "hours" | "days",
            )
          : null,
        prepTime: data.prepTime
          ? convertDurationToMinutes(
              data.prepTime,
              prepUnit as "minutes" | "hours" | "days",
            )
          : null,
        servings: data.servings || null,
        diet: data.diets,
        authorId: user.id,
      };

      if (recipe) {
        await updateRecipe(recipe.id, recipeData);
      } else {
        await addRecipe(recipeData);
      }

      router.push(`/recipes/${slug}`);
    } catch (err) {
      if (IS_DEV) {
        console.error(err);
      }
      throw new Error(tGlobal("something-went-wrong"));
    }
  }

  const handleFormAction = (formData: FormData) => {
    startTransition(async () => {
      await saveData(formData);
    });
  };

  return (
    <form
      action={handleFormAction}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div className="flex w-full justify-center">
        <ImagePicker
          width={400}
          height={260}
          isPending={isPending}
          pickImageLabel={t("pick-image")}
          imageUrl={recipe?.imageUrl || placeholderImage.src}
          imageAlt={"alt"}
          cancelLabel={t("cancel")}
          setFile={setFile}
        />
      </div>
      <div className="lg:col-span-2">
        <Input
          disabled={isPending}
          label={`${t("title-label")}*`}
          placeholder={t("title-placeholder")}
          wrapperClassName="w-full lg:w-[60%]"
          name={"title"}
          defaultValue={title}
          error={
            issues.find((issue) => issue.path[0] === "title")?.message || ""
          }
        />
        <Input
          disabled={isPending}
          as="textarea"
          label={`${t("description-label")}*`}
          placeholder={t("description-placeholder")}
          wrapperClassName="w-full"
          className="h-44.5"
          name="description"
          defaultValue={description}
          error={
            issues.find((issue) => issue.path[0] === "description")?.message ||
            ""
          }
        />
      </div>
      <Select
        disabled={isPending}
        label={`${t("category-label")}*`}
        items={categories}
        placeholder={t("category-placeholder")}
        initialSelectedIndex={
          recipe
            ? recipeCategoryEnum.enumValues.indexOf(recipe?.category)
            : undefined
        }
        wrapperClassName="w-full"
        aria-required
        name="category"
        error={
          issues.find((issue) => issue.path[0] === "category")?.message || ""
        }
      >
        <SelectContent>
          {categories.map((cat, index) => (
            <SelectOption
              value={recipeCategoryEnum.enumValues[index]}
              index={index}
              key={cat.value}
            >
              {cat.name}
            </SelectOption>
          ))}
        </SelectContent>
      </Select>
      <Combobox
        disabled={isPending}
        defaultValue={recipe?.cuisine?.name}
        wrapperClassName="w-full"
        items={cuisineItems || []}
        label={t("cuisine-label")}
        placeholder={t("cuisine-placeholder")}
        allowFreeText
        toggleOpenAriaLabel={t("show-cuisines-aria-label")}
        name="cuisine"
        error={
          issues.find((issue) => issue.path[0] === "cuisineId")?.message || ""
        }
      />
      <Select
        disabled={isPending}
        initialSelectedIndex={
          recipe?.difficulty
            ? recipeDifficultyEnum.enumValues.indexOf(recipe.difficulty)
            : undefined
        }
        label={t("difficulty-label")}
        items={difficulties}
        placeholder={t("difficulty-placeholder")}
        wrapperClassName="w-full"
        name="difficulty"
        error={
          issues.find((issue) => issue.path[0] === "difficulty")?.message || ""
        }
      >
        <SelectContent>
          {difficulties.map((diff, index) => (
            <SelectOption
              value={recipeDifficultyEnum.enumValues[index]}
              index={index}
              key={diff.value}
            >
              {diff.name}
            </SelectOption>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-end gap-1 w-full">
        <ButtonGroup
          wrapperClassName="w-full justify-center"
          dividerClassName="bg-main-content/(--border-transparency)"
          className="w-full"
        >
          <Input
            disabled={isPending}
            startIcon={<PiClock />}
            type="number"
            label={t("prep-time-label")}
            placeholder={t("prep-time-placeholder")}
            wrapperClassName="w-full"
            inputContainerClassName="border-main-content/(--border-transparency) focus-within:border-primary"
            name="prep-time"
            defaultValue={prepTime}
            error={
              issues.find((issue) => issue.path[0] === "prepTime")?.message ||
              ""
            }
          />
          <Select
            disabled={isPending}
            wrapperClassName="w-auto"
            items={timeUnits}
            initialSelectedIndex={0}
            className="border-main-content/(--border-transparency) focus-within:border-primary"
            aria-label={t("time-unit-aria-label")}
            name="prep-unit"
          >
            <SelectContent>
              {timeUnits.map((unit, index) => {
                return (
                  <SelectOption
                    value={restrictedDietEnum.enumValues[index]}
                    key={unit.value}
                    index={index}
                  >
                    {unit.name}
                  </SelectOption>
                );
              })}
            </SelectContent>
          </Select>
        </ButtonGroup>
      </div>
      <div className="flex items-end gap-1 w-full">
        <ButtonGroup
          wrapperClassName="w-full justify-center"
          dividerClassName="bg-main-content/(--border-transparency)"
          className="w-full"
        >
          <Input
            disabled={isPending}
            startIcon={<PiClock />}
            type="number"
            label={t("cook-time-label")}
            placeholder={t("cook-time-placeholder")}
            wrapperClassName="w-full"
            inputContainerClassName="border-main-content/(--border-transparency) focus-within:border-primary"
            name="cook-time"
            defaultValue={cookTime}
            error={
              issues.find((issue) => issue.path[0] === "cookTime")?.message ||
              ""
            }
          />
          <Select
            disabled={isPending}
            wrapperClassName="w-auto"
            items={timeUnits}
            initialSelectedIndex={0}
            className="border-main-content/(--border-transparency) focus-within:border-primary"
            aria-label={t("time-unit-aria-label")}
            name="cook-unit"
          >
            <SelectContent>
              {timeUnits.map((unit, index) => {
                return (
                  <SelectOption key={unit.value} index={index}>
                    {unit.name}
                  </SelectOption>
                );
              })}
            </SelectContent>
          </Select>
        </ButtonGroup>
      </div>
      <Input
        disabled={isPending}
        wrapperClassName="w-full"
        type="number"
        label={t("servings-label")}
        placeholder={t("servings-placeholder")}
        startIcon={<PiForkKnife />}
        name="servings"
        defaultValue={servings}
        error={
          issues.find((issue) => issue.path[0] === "servings")?.message || ""
        }
      />
      <Select
        initialSelectedIndices={
          recipe && recipe.diet
            ? recipe.diet.map((d) => restrictedDietEnum.enumValues.indexOf(d))
            : undefined
        }
        disabled={isPending}
        items={diets}
        label={t("diet-label")}
        removeItemAriaLabel={t("remove-diet-aria-label")}
        removeAllItemsAriaLabel={t("remove-all-diets-aria-label")}
        placeholder={t("diet-placeholder")}
        multiple
        wrapperClassName="col-span-full w-full"
        name="diet"
        error={issues.find((issue) => issue.path[0] === "diets")?.message || ""}
      >
        <SelectContent>
          {diets.map((diet, index) => {
            return (
              <SelectOption key={diet.value} index={index}>
                {diet.name}
              </SelectOption>
            );
          })}
        </SelectContent>
      </Select>
      <div className="flex flex-col gap-2">
        <span className="mb-2">{t("ingredients-label")}</span>
        <Card containerClassName="max-w-full h-fit" className="p-4">
          <ol className="flex flex-col gap-2 w-full">
            {ingredients.map((ingredient, index) => (
              <li
                key={"ingredient " + index}
                className="flex items-center gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-main-content shrink-0" />
                <Input
                  disabled={isPending}
                  aria-label={t("ingredient-aria-label", { index: index + 1 })}
                  value={ingredient}
                  wrapperClassName="w-full"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const newState = [...ingredients];
                    newState[index] = newValue;
                    setIngredients(newState);
                  }}
                  error={
                    issues.find(
                      (issue) =>
                        issue.path[0] === "ingredients" &&
                        issue.path[1] === index,
                    )?.message || ""
                  }
                />
                <Button
                  disabled={isPending}
                  type="button"
                  variant="ghost"
                  aria-label={t("remove-ingredient-label", {
                    index: index + 1,
                  })}
                  startIcon={<PiTrash />}
                  size="sm"
                  color="error"
                  onClick={() => {
                    const newArr = ingredients.filter((_, i) => i !== index);
                    setIngredients(newArr);
                  }}
                />
              </li>
            ))}
          </ol>
          {ingredientsError && (
            <p className="text-error text-sm">{ingredientsError}</p>
          )}
        </Card>
        <Button
          disabled={isPending}
          className="place-self-end"
          variant="outline"
          size="sm"
          type="button"
          onClick={() => {
            const newArr = [...ingredients, ""];
            setIngredients(newArr);
          }}
        >
          {t("add-ingredient-label")}
        </Button>
      </div>
      <div className="flex flex-col gap-2 lg:col-span-2">
        <span className="mb-2">{t("instructions-label")}</span>
        <Card containerClassName="max-w-full h-fit" className="p-4">
          <ol className="flex flex-col gap-2 w-full">
            {instructions.map((step, index) => (
              <li key={"step " + index} className="flex items-center gap-2">
                <span className="w-5 shrink-0">{index + 1}</span>
                <Input
                  disabled={isPending}
                  aria-label={t("instruction-aria-label", { index: index + 1 })}
                  as="textarea"
                  value={step}
                  wrapperClassName="w-full"
                  className="h-22"
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const newState = [...instructions];
                    newState[index] = newValue;
                    setInstructions(newState);
                  }}
                  error={
                    issues.find(
                      (issue) =>
                        issue.path[0] === "instructions" &&
                        issue.path[1] === index,
                    )?.message || ""
                  }
                />
                <Button
                  disabled={isPending}
                  aria-label={t("remove-instruction-label", {
                    index: index + 1,
                  })}
                  type="button"
                  variant="ghost"
                  startIcon={<PiTrash />}
                  size="sm"
                  color="error"
                  onClick={() => {
                    const newState = instructions.filter((_, i) => i !== index);
                    setInstructions(newState);
                  }}
                />
              </li>
            ))}
          </ol>
          {instructionsError && (
            <p className="text-error text-sm">{instructionsError}</p>
          )}
        </Card>
        <Button
          disabled={isPending}
          className="place-self-end"
          variant="outline"
          size="sm"
          type="button"
          onClick={() => {
            const newState = [...instructions, ""];
            setInstructions(newState);
          }}
        >
          {t("add-instruction-label")}
        </Button>
      </div>
      <div className="md:col-span-2 lg:col-span-3">
        {error && <p className="text-sm text-error">{error}</p>}
        <Button
          loading={isPending}
          size="xl"
          className="place-self-end"
          startIcon={recipe ? <PiFloppyDisk /> : <PiPaperPlaneTiltBold />}
        >
          {recipe ? t("save-button") : t("share-button")}
        </Button>
      </div>
    </form>
  );
}
