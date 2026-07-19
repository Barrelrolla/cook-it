import PasswordReset from "@/emails/passwordReset";
import VerificationEmail from "@/emails/verificationEmail";
import { db } from "@/db";
import { authSchema } from "@/db/schemas/auth-schema";
import { SignUpSchema } from "@/utils/validationSchemas";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  user: {
    additionalFields: { displayName: { type: "string", required: false } },
  },
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
      } catch (error) {
        console.log(error);
      }
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await resend.emails.send({
          from: "Garndish <noreply@resend.dev>",
          to: "chetkara@gmail.com",
          subject: "Verify your Garndish account",
          react: VerificationEmail({ name: user.name, url }),
        });
      } catch (error) {
        console.log(error);
      }
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
