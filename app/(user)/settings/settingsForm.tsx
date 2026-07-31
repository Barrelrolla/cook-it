import { Button } from "@barrelrolla/react-components-library";
import { ReactNode } from "react";
import { PiFloppyDiskBold } from "react-icons/pi";
import SettingsBase from "./settingsBase";

export type SettingsFormProps = {
  label: string;
  formAction: (formdata: FormData) => void;
  isLoading: boolean;
  children: ReactNode;
};

export default function SettingsForm({
  label,
  formAction,
  isLoading,
  children,
}: SettingsFormProps) {
  return (
    <SettingsBase label={label}>
      <form className="px-4" action={formAction}>
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
    </SettingsBase>
  );
}
