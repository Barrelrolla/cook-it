"use client";

import { sendEmail } from "@/app/actions/contactActions";
import { Button, Input } from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { PiPaperPlaneTilt } from "react-icons/pi";

export default function ContactForm() {
  const t = useTranslations("ContactPage");
  const [state, formAction, isPending] = useActionState(sendEmail, null);

  return (
    <form action={formAction} className="flex flex-col gap-2 w-[90%] max-w-120">
      <Input
        wrapperClassName="w-full"
        label={t("your-email")}
        type="email"
        name="from"
        required
        defaultValue={state?.from}
        error={state?.errors?.properties?.from?.errors[0]}
        disabled={isPending || state?.success}
      />
      <Input
        wrapperClassName="w-full"
        label={t("subject")}
        name="subject"
        required
        defaultValue={state?.subject}
        error={state?.errors?.properties?.subject?.errors[0]}
        disabled={isPending || state?.success}
      />
      <Input
        wrapperClassName="w-full"
        className="h-28"
        label={t("message")}
        as="textarea"
        name="message"
        required
        defaultValue={state?.message}
        error={state?.errors?.properties?.message?.errors[0]}
        disabled={isPending || state?.success}
      />
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="hp_field">{t("honeypot")}</label>
        <input
          type="text"
          id="hp_field"
          name="hp_field"
          tabIndex={-1}
          autoComplete="off"
          disabled={isPending || state?.success}
        />
      </div>
      <Button
        loading={isPending}
        disabled={state?.success}
        startIcon={<PiPaperPlaneTilt />}
      >
        {t("send")}
      </Button>
      {state?.success && <p className="text-success">{t("email-sent")}</p>}
      {state?.errors && <p className="text-error">{state.errors.errors[0]}</p>}
    </form>
  );
}
