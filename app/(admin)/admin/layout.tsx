import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

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
