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
  .min(3, "Username must be at least 3 characters.")
  .max(30, "Username cannot exceed 30 characters.")
  .regex(
    usernameRegex,
    "Username must start with a letter and can only contain letters, numbers, and single hyphens.",
  );

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
