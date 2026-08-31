import { PropsWithChildren } from "react";

export default function PrivacyText({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
