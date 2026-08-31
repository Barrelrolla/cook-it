import { PropsWithChildren } from "react";

export default function TermsMainTitle({ children }: PropsWithChildren) {
  return <h1 className="font-heading text-4xl">{children}</h1>;
}
