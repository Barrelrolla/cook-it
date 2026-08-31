import { ReactNode } from "react";
import BackButton from "./backButton";
import { Skeleton } from "barrelrolla-ui";

export type SettingBaseProps = {
  label?: string;
  showBack?: boolean;
  children?: ReactNode;
};

export default function SettingsBase({
  label,
  showBack,
  children,
}: SettingBaseProps) {
  return (
    <div className="max-w-150 mx-auto border border-main-content/(--border-transparency) p-4 rounded-containers max-h-[calc(100vh-160px)] overflow-y-auto bg-muted">
      {showBack && <BackButton />}
      {label && <h2 className="font-heading text-3xl mb-6">{label}</h2>}
      {!label && <Skeleton className="h-9 w-50" />}
      {children}
    </div>
  );
}
