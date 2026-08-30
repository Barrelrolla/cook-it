import { Footer } from "barrelrolla-ui";
import Brand from "./footerBrand";
import { getTranslations } from "next-intl/server";
import FooterLinks from "./footerLinks";

export default async function MainFooter() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();
  return (
    <Footer
      className="flex-col items-center bg-muted text-main-content"
      containerClassName="bg-muted border-t border-main-content/(--border-transparency)"
    >
      <div className="flex flex-col md:flex-row gap-4 justify-between w-full">
        <Brand />
        <FooterLinks />
      </div>
      <p className="text-center">{t("all-rights-reserved", { year })}</p>
    </Footer>
  );
}
