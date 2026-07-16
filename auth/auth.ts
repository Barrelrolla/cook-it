import PasswordReset from "@/app/components/email/passwordReset";
import VerificationEmail from "@/app/components/email/verificationEmail";
import { db } from "@/db";
import { authSchema } from "@/db/schemas/auth-schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema: authSchema }),
  trustedOrigins: ["http://192.168.100.72:3000"],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ url }) => {
      console.log("requesting password reset");
      try {
        console.log("sending reset pass");
        await resend.emails.send({
          from: "Garndish <noreply@resend.dev>",
          to: "chetkara@gmail.com",
          subject: "Reset your Garndish password",
          react: PasswordReset({ url }),
        });
      } catch (error) {
        console.log(error, "pass reset error");
      }
      console.log("sent pass reset");
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      console.log("reqesting verification");
      try {
        console.log("sending verificiation");
        await resend.emails.send({
          from: "Garndish <noreply@resend.dev>",
          to: "chetkara@gmail.com",
          subject: "Verify your Garndish account",
          react: VerificationEmail({ user, url }),
        });
      } catch (error) {
        console.log(error, "verification error");
      }
      console.log("sent verification");
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
