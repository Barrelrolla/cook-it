import { PropsWithChildren } from "react";

export default function PrivacySection({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-6">{children}</div>;
}
