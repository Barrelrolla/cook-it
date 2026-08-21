import { getTranslations } from "next-intl/server";
import ShareForm from "./shareForm";
import { getAllCuisines } from "@/app/actions/cuisineActions";
import { getSession } from "@/app/actions/authActions";
import { redirect } from "next/navigation";

export default async function SharePage() {
  const t = await getTranslations("SharePage");
  const cuisines = await getAllCuisines();
  const session = await getSession();
  if (!session) {
    redirect("/?signin");
  }

  const plainUser = JSON.parse(JSON.stringify(session.user));

  return (
    <main className="p-4">
      <h1 className="text-2xl font-heading">{t("title")}</h1>
      <ShareForm
        cuisines={cuisines?.map((cuisine) => cuisine.name) || []}
        user={plainUser}
      />
    </main>
  );
}
