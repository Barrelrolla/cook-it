import { getSession } from "@/app/actions/authActions";
import { getUserBySlug } from "@/app/actions/userActions";
import { authClient } from "@/auth/authClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
      <h1 className="text-6xl font-heading">
        {current
          ? `Hello, ${user.displayName}!`
          : `${user.displayName}'s profile`}
      </h1>
    </main>
  );
}
