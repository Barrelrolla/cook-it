"use server";

import { IS_DEV } from "@/utils/helpers";
import { createContactValidation } from "@/utils/validationSchemas";
import { getTranslations } from "next-intl/server";
import { Resend } from "resend";
import z from "zod";

type SendEmailActionState = {
  success: boolean;
  from?: string;
  subject?: string;
  message?: string;
  errors?: {
    errors: string[];
    properties?:
      | {
          from?: { errors: string[] } | undefined;
          subject?: { errors: string[] } | undefined;
          message?: { errors: string[] } | undefined;
          hp_field?: { errors: string[] } | undefined;
        }
      | undefined;
  };
};

export async function sendEmail(
  prevState: SendEmailActionState | null,
  formData: FormData,
): Promise<SendEmailActionState> {
  const t = await getTranslations("Validation");

  const rawData = {
    from: formData.get("from")?.toString() || "",
    subject: formData.get("subject")?.toString() || "",
    message: formData.get("message")?.toString() || "",
    hp_field: formData.get("hp_field") ?? "",
  };

  const result = createContactValidation(t).safeParse(rawData);

  if (!result.success) {
    const fieldErrors = z.treeifyError(result.error);

    if (fieldErrors.properties?.hp_field) {
      return { success: true };
    }

    return {
      success: false,
      errors: fieldErrors,
      from: rawData.from,
      subject: rawData.subject,
      message: rawData.message,
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    await resend.emails.send({
      from: "Garndish <support@users.garndish.com>",
      to: "support@garndish.com",
      replyTo: result.data.from,
      subject: result.data.subject,
      text: result.data.message,
    });
  } catch (err) {
    if (IS_DEV) {
      console.error(err);
    }
    return {
      success: false,
      errors: {
        errors: [t("email-fail")],
      },
    };
  }

  return { success: true };
}
