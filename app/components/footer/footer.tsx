import { Footer } from "@barrelrolla/react-components-library";
import Brand from "./footerBrand";
import { getTranslations } from "next-intl/server";

export default async function MainFooter() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();
  return (
    <Footer
      className="flex-col md:flex-row mt-4 items-center bg-muted text-main-content"
      containerClassName="bg-muted border-t border-main-content/(--border-transparency)"
    >
      <Brand />
      <p className="text-center">{t("all-rights-reserved", { year })}</p>
      <div className="h-18 w-34 hidden md:block" />
    </Footer>
  );
}
