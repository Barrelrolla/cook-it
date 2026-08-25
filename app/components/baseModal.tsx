import { Ref } from "react";
import {
  CardTitle,
  Dialog,
  DialogProps,
} from "@barrelrolla/react-components-library";

type BaseModalProps = {
  formRef?: Ref<HTMLFormElement> | null;
  formAction: (formData: FormData) => void;
  title: string;
  closeLabel: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
} & DialogProps;

export default function BaseModal({
  formRef,
  formAction,
  title,
  closeLabel,
  isOpen,
  setIsOpen,
  children,
  ...rest
}: BaseModalProps) {
  return (
    <Dialog
      aria-label={title}
      closeButtonAriaLabel={closeLabel}
      backdropClassName="items-start md:items-center backdrop-blur-[2px]"
      containerClassName="w-[80vw] max-w-80 mt-22 md:mt-0"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      {...rest}
    >
      <CardTitle className="font-heading pr-10">{title}</CardTitle>
      <form
        action={formAction}
        ref={formRef}
        className="flex flex-col p-4 gap-4 text-sm"
      >
        {children}
      </form>
    </Dialog>
  );
}
