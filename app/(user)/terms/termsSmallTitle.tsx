import { PropsWithChildren } from "react";

export default function TermsSmallTitle({ children }: PropsWithChildren) {
  return <h3 className="text-xl font-bold">{children}</h3>;
}
