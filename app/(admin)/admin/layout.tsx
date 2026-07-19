import { PropsWithChildren } from "react";
import { notFound } from "next/navigation";

export default function AdminPageLayout({ children }: PropsWithChildren) {
  if (true) {
    notFound();
  }
  return (
    <>
      <header>ADMIN PAGE</header>
      <div>{children}</div>
    </>
  );
}
