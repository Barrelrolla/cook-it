import z from "zod";

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

export const displayNameSchema = z
  .string()
  .min(3, "Display name must be at least 3 characters")
  .max(20, "Display name cannot exceed 20 characters")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Display name can only contain letters, numbers, underscores, and hyphens",
  )
  .regex(/^[a-zA-Z]/, "Display name must start with a letter");

export const SignUpSchema = z.object({
  displayName: displayNameSchema,
  email: z.email(),
  password: passwordSchema,
});
