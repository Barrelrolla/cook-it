import { Suspense } from "react";
import MainNavbar from "./components/navbar/mainNavbar";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("Global");
  return (
    <>
      <Suspense>
        <MainNavbar />
      </Suspense>
      <main className="mt-22">{t("page-not-found")}</main>
    </>
  );
}
