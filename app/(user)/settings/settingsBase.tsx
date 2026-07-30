import { Button } from "@barrelrolla/react-components-library";
import { ReactNode } from "react";
import { PiFloppyDiskBold } from "react-icons/pi";

export type SettingBaseProps = {
  label: string;
  formAction: (formdata: FormData) => void;
  isLoading: boolean;
  children: ReactNode;
};

export default function SettingsBase({
  label,
  formAction,
  isLoading,
  children,
}: SettingBaseProps) {
  return (
    <div className="max-w-150 mx-auto border border-main-content/(--border-transparency) p-4 rounded-containers max-h-[calc(100vh-160px)] overflow-y-auto bg-muted">
      <h2 className="font-heading text-3xl mb-6">{label}</h2>
      <form action={formAction}>
        {children}
        <div className="w-full flex justify-end">
          <Button
            color="primary"
            className="mt-4"
            startIcon={<PiFloppyDiskBold />}
            loading={isLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
