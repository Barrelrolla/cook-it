import z from "zod";
import { getTranslations } from "next-intl/server";
import { checkUsernameAvailability } from "@/app/actions/authActions";
import {
  recipeCategoryEnum,
  recipeDifficultyEnum,
  restrictedDietEnum,
} from "@/db/schemas/recipe-schema";

type ValidationTranslator = Awaited<
  ReturnType<typeof getTranslations<"Validation">>
>;
export const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*(?:-[a-zA-Z0-9]+)*$/;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;

export function createPasswordValidation(t: ValidationTranslator) {
  const MIN_LENGTH = 8;
  const MAX_LENGTH = 20;
  return z
    .string()
    .min(MIN_LENGTH, { error: t("password-min-length", { min: MIN_LENGTH }) })
    .max(MAX_LENGTH, { error: t("password-max-length", { max: MAX_LENGTH }) })
    .refine((password) => /[A-Z]/.test(password), {
      error: t("password-uppercase"),
    })
    .refine((password) => /[a-z]/.test(password), {
      error: t("password-lowercase"),
    })
    .refine((password) => /[0-9]/.test(password), {
      error: t("password-number"),
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      error: t("password-special-character"),
    });
}

export function createUsernameValidation(t: ValidationTranslator) {
  return z
    .string()
    .trim()
    .min(
      USERNAME_MIN_LENGTH,
      t("username-min-length", { min: USERNAME_MIN_LENGTH }),
    )
    .max(
      USERNAME_MAX_LENGTH,
      t("username-max-length", { max: USERNAME_MAX_LENGTH }),
    )
    .regex(usernameRegex, t("username-characters"));
}

export function createSignupValidation(t: ValidationTranslator) {
  return z
    .object({
      username: createUsernameValidation(t),
      email: z.email({ error: t("email") }),
      password: createPasswordValidation(t),
    })
    .refine(
      async (data) => {
        return await checkUsernameAvailability(data.username);
      },
      {
        path: ["username"],
        error: t("username-used"),
      },
    );
}

export function createDisplayNameValidation(t: ValidationTranslator) {
  const MIN_LENGTH = 1;
  const MAX_LENGTH = 70;
  return z
    .string()
    .trim()
    .min(MIN_LENGTH, t("name-min-length"))
    .max(MAX_LENGTH, t("name-max-length"))
    .refine((val) => val.length > 0, {
      error: t("name-only-spaces"),
    })
    .refine((val) => /^[\p{L}\p{M}\s'\.\-]+$/u.test(val), {
      error: t("name-invalid-characters"),
    });
}

export function createPermissiveNameValidation(t: ValidationTranslator) {
  const MIN_LENGTH = 1;
  const MAX_LENGTH = 100;
  return z
    .string()
    .trim()
    .min(MIN_LENGTH, t("name-min-length"))
    .max(MAX_LENGTH, t("name-max-length"))
    .refine((val) => !/[\r\n\t]/.test(val), {
      error: t("name-tabs"),
    });
}

export function createPasswordInputValidation(t: ValidationTranslator) {
  return z
    .object({
      password: createPasswordValidation(t),
      repeatPassword: z.string(),
    })
    .refine((data) => data.password === data.repeatPassword, {
      path: ["repeat-password"],
      error: t("passwords-not-matching"),
    });
}

export function createImageFileValidation(t: ValidationTranslator) {
  const MAX_FILE_SIZE = 5;
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

  return z
    .instanceof(File, { error: t("image-file-required") })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE * 1024 * 1024,
      t("max-image-file-size", { max: MAX_FILE_SIZE }),
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      t("unsupported-image-file"),
    );
}

export function createRecipeValidation(t: ValidationTranslator) {
  const TITLE_MIN_LENGTH = 1;
  const TITLE_MAX_LENGTH = 255;
  const DESCRIPTION_MIN_LENGTH = 1;
  const DESCRIPTION_MAX_LENGHT = 2000;
  const INGREDIENT_LIST_MIN_LENGTH = 1;
  const INGREDIENT_LIST_MAX_LENGTH = 255;
  const INGREDIENT_ITEM_MIN_LENGTH = 1;
  const INGREDIENT_ITEM_MAX_LENGTH = 255;
  const INSTRUCTION_LIST_MIN_LENGTH = 1;
  const INSTRUCTION_LIST_MAX_LENGTH = 255;
  const INSTRUCTION_ITEM_MIN_LENGTH = 1;
  const INSTRUCTION_ITEM_MAX_LENGTH = 255;
  return z.object({
    title: z
      .string()
      .trim()
      .min(TITLE_MIN_LENGTH, t("recipe-title-min-length"))
      .max(
        TITLE_MAX_LENGTH,
        t("recipe-title-max-length", { max: TITLE_MAX_LENGTH }),
      ),
    description: z
      .string()
      .trim()
      .min(DESCRIPTION_MIN_LENGTH, t("recipe-description-min-length"))
      .max(
        DESCRIPTION_MAX_LENGHT,
        t("recipe-description-max-length", { max: DESCRIPTION_MAX_LENGHT }),
      ),
    category: z.enum(recipeCategoryEnum.enumValues, {
      error: t("recipe-category"),
    }),
    cuisineId: z
      .uuid({ error: t("recipe-cuisine") })
      .nullable()
      .optional(),
    difficulty: z
      .enum(recipeDifficultyEnum.enumValues, {
        error: t("recipe-difficulty"),
      })
      .nullable()
      .optional(),
    prepTime: z.coerce
      .number()
      .int({ error: t("recipe-prep-time") })
      .nullable()
      .optional(),
    cookTime: z.coerce
      .number()
      .int({ error: t("recipe-cook-time") })
      .optional(),
    servings: z.coerce
      .number()
      .int({ error: t("recipe-servings") })
      .optional(),
    diet: z.array(z.enum(restrictedDietEnum.enumValues), {
      error: t("recipe-diet"),
    }),
    ingredients: z
      .array(
        z
          .string()
          .trim()
          .min(INGREDIENT_ITEM_MIN_LENGTH, {
            error: t("recipe-ingredient-item-min"),
          })
          .max(INGREDIENT_ITEM_MAX_LENGTH, {
            error: t("recipe-ingredient-item-max", {
              max: INGREDIENT_ITEM_MAX_LENGTH,
            }),
          }),
      )
      .min(INGREDIENT_LIST_MIN_LENGTH, {
        error: t("recipe-ingredient-list-min", {
          min: INGREDIENT_LIST_MIN_LENGTH,
        }),
      })
      .max(INGREDIENT_LIST_MAX_LENGTH, {
        error: t("recipe-ingredient-list-max", {
          max: INGREDIENT_LIST_MAX_LENGTH,
        }),
      }),
    instructions: z
      .array(
        z
          .string()
          .trim()
          .min(INSTRUCTION_ITEM_MIN_LENGTH, {
            error: t("recipe-instruction-item-min"),
          })
          .max(INSTRUCTION_ITEM_MAX_LENGTH, {
            error: t("recipe-instruction-item-max", {
              max: INSTRUCTION_ITEM_MAX_LENGTH,
            }),
          }),
      )
      .min(INSTRUCTION_LIST_MIN_LENGTH, {
        error: t("recipe-instruction-list-min", {
          min: INSTRUCTION_LIST_MIN_LENGTH,
        }),
      })
      .max(INSTRUCTION_LIST_MAX_LENGTH, {
        error: t("recipe-instruction-list-max", {
          max: INSTRUCTION_LIST_MAX_LENGTH,
        }),
      }),
  });
}

export const createContactValidation = (t: ValidationTranslator) => {
  const sanitizeHeader = (val: string) => val.replace(/[\r\n]/g, "").trim();
  const SUBJECT_MIN = 1;
  const SUBJECT_MAX = 150;
  const MESSAGE_MIN = 10;
  const MESSAGE_MAX = 5000;
  return z.object({
    from: z.email({ error: t("email") }).transform(sanitizeHeader),
    subject: z
      .string()
      .min(SUBJECT_MIN, t("contact-subject-min"))
      .max(SUBJECT_MAX, t("contact-subject-max", { max: SUBJECT_MAX }))
      .transform(sanitizeHeader),
    message: z
      .string()
      .min(MESSAGE_MIN, t("contact-message-min", { min: MESSAGE_MIN }))
      .max(MESSAGE_MAX, t("contact-message-max"))
      .trim(),
    hp_field: z.string().max(0, t("spam-detected")),
  });
};
