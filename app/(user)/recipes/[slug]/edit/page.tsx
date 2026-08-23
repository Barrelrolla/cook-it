import ShareForm from "@/app/(user)/share/shareForm";
import { getSession } from "@/app/actions/authActions";
import { getAllCuisines } from "@/app/actions/cuisineActions";
import { getRecipeBySlug } from "@/app/actions/recipeActions";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EditRecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  const session = await getSession();
  if (!session || !recipe || session.user.id !== recipe.authorId) {
    redirect(`/recipes/${slug}`);
  }

  const t = await getTranslations("SharePage");
  const cuisines = await getAllCuisines();
  const user = JSON.parse(JSON.stringify(session.user));
  return (
    <main className="p-4">
      <h1 className="text-2xl font-heading">{t("edit-title")}</h1>
      <ShareForm
        recipe={recipe}
        cuisines={cuisines?.map((cuisine) => cuisine.name) || []}
        user={user}
      />
    </main>
  );
}
