import { Button } from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import { PiWarning } from "react-icons/pi";
import BaseModal from "./baseModal";

export type DestructiveModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  action: () => void;
  title: string;
};

export default function DestructiveModal({
  isOpen,
  setIsOpen,
  action,
  title,
}: DestructiveModalProps) {
  const t = useTranslations("DestructiveModal");
  return (
    <BaseModal
      closeLabel={t("close")}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      formAction={action}
      title={title}
      initialFocus={0}
    >
      <p className="text-4xl flex justify-center w-full">
        <PiWarning className="text-error" />
      </p>
      <p className="text-center">{t("are-you-sure")}</p>
      <div className="flex justify-between w-full">
        <Button
          size="sm"
          type="button"
          color="main"
          variant="outline"
          onClick={() => setIsOpen(false)}
        >
          {t("no")}
        </Button>
        <Button size="sm" color="error">
          {t("yes")}
        </Button>
      </div>
    </BaseModal>
  );
}
