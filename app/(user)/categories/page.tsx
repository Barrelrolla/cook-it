import { recipeCategoryEnum } from "@/db/schemas/recipe-schema";
import { getTranslations } from "next-intl/server";
import CategoryCard from "./categoryCard";

export default async function CategoriesPage() {
  const t = await getTranslations("Recipes.Categories");
  return (
    <main>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {recipeCategoryEnum.enumValues.map((cat) => {
          return <CategoryCard key={cat} category={cat} />;
        })}
      </div>
    </main>
  );
}
