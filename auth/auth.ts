import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins/username";
import { admin } from "better-auth/plugins/admin";
import { Resend } from "resend";
import { db } from "@/db";
import { authSchema } from "@/db/schemas/auth-schema";
import { SignUpSchema, usernameRegex } from "@/utils/validationSchemas";
import PasswordReset from "@/emails/passwordReset";
import VerificationEmail from "@/emails/verificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  plugins: [
    admin(),
    username({
      usernameValidator(username) {
        return (
          username.length > 3 &&
          username.length < 30 &&
          usernameRegex.test(username)
        );
      },
    }),
  ],
  database: drizzleAdapter(db, { provider: "pg", schema: authSchema }),
  trustedOrigins: ["http://192.168.100.72:3000", "http://192.168.0.133:3000"],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      switch (ctx.path) {
        case "/sign-up/email":
          const res = await SignUpSchema.safeParseAsync(ctx.body);
          if (!res.success) {
            throw new APIError("BAD_REQUEST", {
              message: res.error.issues[0].message,
            });
          }
          break;
      }
    }),
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ url }) => {
      try {
        await resend.emails.send({
          from: "Garndish <noreply@resend.dev>",
          to: "chetkara@gmail.com",
          subject: "Reset your Garndish password",
          react: PasswordReset({ url }),
        });
      } catch {}
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await resend.emails.send({
          from: "Garndish <noreply@resend.dev>",
          to: "chetkara@gmail.com",
          subject: "Verify your Garndish account",
          react: VerificationEmail({ name: user.name.toLowerCase(), url }),
        });
      } catch {}
    },
    autoSignInAfterVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  account: { accountLinking: { enabled: true, trustedProviders: ["google"] } },
});
