import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("Global");
  return (
    <>
      <main className="mt-22">{t("page-not-found")}</main>
    </>
  );
}
