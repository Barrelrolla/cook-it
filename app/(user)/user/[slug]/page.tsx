import { getSession } from "@/app/actions/authActions";
import { getUserBySlug } from "@/app/actions/userActions";
import RecipeList from "@/app/components/recipes/recipeList";
import RecipeListLoading from "@/app/components/recipes/recipeListLoading";
import UserAvatar from "@/app/components/userAvatar";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const user = await getUserBySlug(slug);

  return {
    metadataBase: new URL(process.env.BASE_URL!),
    title: user
      ? `${user.displayName}'s profile `
      : "User not found " + "| Garndish",
    openGraph: { images: user?.image || undefined },
  };
}

export default async function UserPage({ params }: Props) {
  const { slug } = await params;
  const user = await getUserBySlug(slug);
  if (!user) {
    notFound();
  }
  const session = await getSession();
  const current =
    session?.user.displayName?.toLowerCase() === slug.toLowerCase();

  return (
    <main className="pt-4">
      <section
        style={{
          backgroundColor:
            "color-mix(in oklab, var(--color-primary-content) %, var(--color-main))",
        }}
        className="flex m-4 mt-0 flex-col md:flex-row rounded-containers border border-main-content/(--border-transparency)"
      >
        <div className="w-1/3 p-4 lg:p-8 mx-auto justify-items-center">
          {user.image && (
            <UserAvatar
              avatarUrl={user.image}
              displayName={user.displayName || ""}
              className="size-50"
            />
          )}
        </div>
        <div className="w-full md:w-2/3 md:pt-8 text-center md:text-left">
          <h1 className="text-4xl font-heading">{user.name}</h1>
          <p className="my-4">@{user.displayName}</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl mx-4">
          {current ? "My recipes" : "Uploaded recipes"}
        </h2>
        <Suspense fallback={<RecipeListLoading />}>
          <RecipeList />
        </Suspense>
      </section>
    </main>
  );
}
