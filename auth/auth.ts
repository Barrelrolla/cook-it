import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins/username";
import { admin } from "better-auth/plugins/admin";
import { Resend } from "resend";
import { db } from "@/db";
import { authSchema } from "@/db/schemas/auth-schema";
import {
  createSignupValidation,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  usernameRegex,
} from "@/utils/validationSchemas";
import PasswordReset from "@/emails/passwordReset";
import VerificationEmail from "@/emails/verificationEmail";
import DeleteAccount from "@/emails/deleteAccount";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { createTranslator } from "next-intl";
import en from "@/messages/en.json";

const messages = { en };

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  plugins: [
    admin(),
    username({
      usernameValidator(username) {
        return (
          username.length > USERNAME_MIN_LENGTH &&
          username.length < USERNAME_MAX_LENGTH &&
          usernameRegex.test(username)
        );
      },
    }),
  ],
  database: drizzleAdapter(db, { provider: "pg", schema: authSchema }),
  trustedOrigins: [
    "http://192.168.100.72:3000",
    "http://192.168.0.133:3000",
    "http://192.168.100.50:3000",
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      const locale = ctx.headers?.get("x-locale") ?? "en";
      //todo: add support for other languages, when we have them
      const t = createTranslator({
        locale,
        messages: messages.en,
        namespace: "Validation",
      });

      switch (ctx.path) {
        case "/sign-up/email":
          const res = await createSignupValidation(t).safeParseAsync(ctx.body);
          if (!res.success) {
            throw new APIError("BAD_REQUEST", {
              message: res.error.issues[0].message,
            });
          }
          break;
      }
    }),
  },
  user: {
    changeEmail: { enabled: true },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        const cookieStore = await cookies();
        const locale = cookieStore.get("locale")?.value ?? "en";
        const t = await getTranslations({
          locale,
        });
        const brand = t("Global.brand-name");
        try {
          await resend.emails.send({
            from: "Garndish <noreply@resend.dev>",
            to: "chetkara@gmail.com",
            subject: t("Emails.delete-subject", { brand }),
            react: DeleteAccount({ t, user: user.name, url }),
          });
        } catch {}
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ url }) => {
      try {
        const cookieStore = await cookies();
        const locale = cookieStore.get("locale")?.value ?? "en";
        const t = await getTranslations({
          locale,
        });
        const brand = t("Global.brand-name");
        await resend.emails.send({
          from: "Garndish <noreply@resend.dev>",
          to: "chetkara@gmail.com",
          subject: t("Emails.password-reset-subject", { brand }),
          react: PasswordReset({ t, url }),
        });
      } catch {}
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      try {
        const cookieStore = await cookies();
        const locale = cookieStore.get("locale")?.value ?? "en";
        const t = await getTranslations({
          locale,
        });
        const brand = t("Global.brand-name");
        await resend.emails.send({
          from: "Garndish <noreply@resend.dev>",
          to: "chetkara@gmail.com",
          subject: t("Emails.verify-subject", { brand }),
          react: VerificationEmail({ t, name: user.name, url }),
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
