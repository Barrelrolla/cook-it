import { PropsWithChildren } from "react";

export default function TermsTitle({ children }: PropsWithChildren) {
  return <h2 className="font-heading text-2xl">{children}</h2>;
}
