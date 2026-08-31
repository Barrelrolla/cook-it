import { PropsWithChildren } from "react";

export default function TermsText({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
