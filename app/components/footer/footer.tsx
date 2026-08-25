import { Footer } from "@barrelrolla/react-components-library";
import Brand from "./footerBrand";
import { getTranslations } from "next-intl/server";

export default async function MainFooter() {
  const t = await getTranslations("Global");
  const year = new Date().getFullYear();
  return (
    <Footer
      className="mt-4 items-center bg-muted text-main-content"
      containerClassName="bg-muted border-t border-main-content/(--border-transparency)"
    >
      <Brand />
      <p>{t("all-rights-reserved", { year })}</p>
      <div className="h-18 w-34" />
    </Footer>
  );
}
