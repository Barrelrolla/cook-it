import z from "zod";
import { checkUsernameAvailability } from "@/app/actions/authActions";

export const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*(?:-[a-zA-Z0-9]+)*$/;

export const passwordSchema = z
  .string()
  .min(8, { message: "Password should be at least 8 symbols." })
  .max(20, { message: "Password should be maximum 20 symbols." })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password should include at least one uppercase letter.",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password should include at least one lowercase letter.",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password should inlude at least one number.",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "Password should include at least one special character.",
  });

export const usernameSchema = z
  .string()
  .trim()
  .min(3, "Username must be at least 3 characters.")
  .max(30, "Username cannot exceed 30 characters.")
  .regex(
    usernameRegex,
    "Username must start with a letter and can only contain letters, numbers, and single hyphens.",
  );

export const displayNameSchema = z
  .string()
  .trim()
  .min(1, "Display name is required")
  .max(70, "Display name must be 70 characters or less")
  .refine((val) => val.length > 0, {
    message: "Display name cannot consist only of spaces",
  })
  .refine((val) => /^[\p{L}\p{M}\s'\.\-]+$/u.test(val), {
    message: "Display name contains invalid characters",
  });

export const permissiveDisplayNameSchema = z
  .string()
  .trim()
  .min(1, "Display name is required")
  .max(100, "Display name is too long")
  .refine((val) => !/[\r\n\t]/.test(val), {
    message: "Display name cannot contain line breaks or tabs",
  });

export const SignUpSchema = z
  .object({
    username: usernameSchema,
    email: z.email(),
    password: passwordSchema,
  })
  .refine(
    async (data) => {
      return await checkUsernameAvailability(data.username);
    },
    {
      path: ["username"],
      message: "Username is already in use",
    },
  );

const MAX_FILE_SIZE = 5;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const ImageFileSchema = z
  .instanceof(File, { message: "An image file is required" })
  .refine(
    (file) => file.size <= MAX_FILE_SIZE * 1024 * 1024,
    `Max file size is ${MAX_FILE_SIZE}MB.`,
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    "Only .jpg, .png, and .webp formats are supported.",
  );
