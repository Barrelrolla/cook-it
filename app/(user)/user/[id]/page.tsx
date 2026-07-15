import { getSession } from "@/app/actions/authActions";
import { getUserById } from "@/app/actions/userActions";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserById(id);
  if (!user) {
    notFound();
  }
  const session = await getSession();
  const me = session?.user.id === id;
  return (
    <main className="pt-4">
      <h1 className="text-6xl font-heading">
        {me ? `Hello, ${user.name}!` : `${user.name}'s profile`}
      </h1>
    </main>
  );
}
