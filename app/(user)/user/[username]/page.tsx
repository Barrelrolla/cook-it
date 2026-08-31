import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSession } from "@/app/actions/authActions";
import { getUserByUsername } from "@/app/actions/userActions";
import RecipeListLoading from "@/app/components/recipes/recipeListLoading";
import UserAvatar from "@/app/components/userAvatar";
import { getTranslations } from "next-intl/server";
import { UserRecipeBar } from "./userRecipeBar";
import UserRecipes from "./userRecipes";

type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ saved?: string; page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const user = await getUserByUsername(username);
  const tGlobal = await getTranslations("Global");
  const t = await getTranslations("UserPage");

  return {
    metadataBase: new URL(process.env.BASE_URL!),
    title: user?.displayUsername
      ? `${t("metadata-title", { name: user.displayUsername })} | ${tGlobal("brand-name")}`
      : `${t("user-not-found")} | ${tGlobal("brand-name")}`,
    openGraph: { images: user?.image || undefined },
  };
}

export default async function UserPage({ params, searchParams }: Props) {
  const { username } = await params;
  const { saved, page } = await searchParams;

  const [user, session] = await Promise.all([
    getUserByUsername(username),
    getSession(),
  ]);
  if (!user) {
    notFound();
  }
  const current = session?.user.username === username;
  // const isAdmin = current && user.role === "admin";

  return (
    <main className="pt-4">
      <section className="flex m-4 mt-0 flex-col md:flex-row bg-muted rounded-containers border border-main-content/(--border-transparency)">
        <div className="w-1/3 p-4 lg:p-8 mx-auto justify-items-center">
          {user.image && (
            <UserAvatar
              avatarUrl={user.image}
              name={user.name || ""}
              className="size-50"
            />
          )}
        </div>
        <div className="w-full md:w-2/3 text-center md:text-left flex flex-col justify-center">
          <h1 className="text-4xl font-heading">{user.name}</h1>
          <p className="my-4">@{user.displayUsername}</p>
        </div>
      </section>
      <section>
        <UserRecipeBar isCurrentUser={current} />
        <Suspense
          key={saved !== undefined ? "saved" : "published"}
          fallback={<RecipeListLoading />}
        >
          <UserRecipes userId={user.id} saved={saved} page={page} />
        </Suspense>
      </section>
    </main>
  );
}
