import z from "zod";
import { getTranslations } from "next-intl/server";
import { checkUsernameAvailability } from "@/app/actions/authActions";

type ValidationTranslator = Awaited<
  ReturnType<typeof getTranslations<"Validation">>
>;
export const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*(?:-[a-zA-Z0-9]+)*$/;

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
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 30;
  return z
    .string()
    .trim()
    .min(MIN_LENGTH, t("username-min-length", { min: MIN_LENGTH }))
    .max(MAX_LENGTH, t("username-max-length", { max: MAX_LENGTH }))
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
