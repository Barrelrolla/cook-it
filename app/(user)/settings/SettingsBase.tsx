import { ReactNode } from "react";

export type SettingBaseProps = {
  label: string;
  formAction: (formdata: FormData) => void;
  children: ReactNode;
};

export default function SettingsBase({
  label,
  formAction,
  children,
}: SettingBaseProps) {
  return (
    <div className="max-w-150 mx-auto border border-main-content/(--border-transparency) p-4 rounded-containers max-h-[calc(100vh-160px)] overflow-y-auto">
      <h2 className="font-heading text-3xl mb-6">{label}</h2>
      <form action={formAction}>{children}</form>
    </div>
  );
}
