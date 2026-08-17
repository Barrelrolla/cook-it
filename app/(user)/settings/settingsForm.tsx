import { Button } from "@barrelrolla/react-components-library";
import { ReactNode } from "react";
import { PiFloppyDiskBold } from "react-icons/pi";
import SettingsBase from "./settingsBase";
import { useTranslations } from "next-intl";

export type SettingsFormProps = {
  label: string;
  formAction: (formdata: FormData) => void;
  isLoading: boolean;
  isActionDisabled: boolean;
  showBack?: boolean;
  children: ReactNode;
};

export default function SettingsForm({
  label,
  formAction,
  isLoading,
  isActionDisabled,
  showBack,
  children,
}: SettingsFormProps) {
  const t = useTranslations("Settings");
  return (
    <SettingsBase showBack={showBack} label={label}>
      <form className="px-4" action={formAction}>
        {children}
        <div className="w-full flex justify-end">
          <Button
            color="primary"
            className="mt-4"
            startIcon={<PiFloppyDiskBold />}
            loading={isLoading}
            disabled={isActionDisabled}
          >
            {t("save")}
          </Button>
        </div>
      </form>
    </SettingsBase>
  );
}
