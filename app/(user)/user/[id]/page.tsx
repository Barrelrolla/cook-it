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
  return (
    <main className="pt-4">
      <h1 className="text-6xl font-heading">{`Hello, ${user.name}!`}</h1>
    </main>
  );
}
