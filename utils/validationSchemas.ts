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

export const SignUpSchema = z.object({
  name: z.string().min(3, "Username should be at least 3 characters long!"),
  email: z.email(),
  password: passwordSchema,
});
