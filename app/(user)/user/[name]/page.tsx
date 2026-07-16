import { getSession } from "@/app/actions/authActions";
import { getUserByName } from "@/app/actions/userActions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ name: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const user = await getUserByName(name);

  return {
    metadataBase: new URL(process.env.BASE_URL!),
    title: `${user?.name}'s profile | Garndish`,
    openGraph: { images: user?.image || undefined },
  };
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const user = await getUserByName(name);
  if (!user) {
    notFound();
  }
  const session = await getSession();
  const current = session?.user.name === name;
  return (
    <main className="pt-4">
      <h1 className="text-6xl font-heading">
        {current ? `Hello, ${user.name}!` : `${user.name}'s profile`}
      </h1>
    </main>
  );
}
