import { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { getSession } from "@/app/actions/authActions";

export default async function AdminPageLayout({ children }: PropsWithChildren) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    notFound();
  }

  return (
    <>
      <header>ADMIN PAGE</header>
      <div>{children}</div>
    </>
  );
}
