import Image from "next/image";
import logoLight from "@/public/logo-light.svg";
import logoDark from "@/public/logo-dark.svg";
import { getTranslations } from "next-intl/server";

export default async function ComingSoonPage() {
  const t = await getTranslations("Global");
  const brand = t("brand-name");
  return (
    <main className="flex flex-col justify-center min-h-[70vh]!">
      <Image
        className="block dark:hidden"
        src={logoLight}
        alt={t("logo-alt", { brand })}
        priority
      />
      <Image
        className="hidden dark:block"
        src={logoDark}
        alt={t("logo-alt", { brand })}
        priority
      />
      <h1 className="font-heading text-6xl text-center text-primary">
        {t("coming-soon")}
      </h1>
    </main>
  );
}
