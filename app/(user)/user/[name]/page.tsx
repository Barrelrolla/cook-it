import { getSession } from "@/app/actions/authActions";
import { getUserByName } from "@/app/actions/userActions";
import { notFound } from "next/navigation";

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
