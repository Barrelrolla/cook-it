import { PropsWithChildren, Ref } from "react";
import { CardTitle, Dialog } from "@barrelrolla/react-components-library";

type BaseModalProps = {
  formRef?: Ref<HTMLFormElement> | null;
  formAction: (formData: FormData) => void;
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
} & PropsWithChildren;

export default function BaseModal({
  formRef,
  formAction,
  title,
  isOpen,
  setIsOpen,
  children,
}: BaseModalProps) {
  return (
    <Dialog
      aria-label={title}
      backdropClassName="items-start md:items-center backdrop-blur-[2px]"
      containerClassName="w-[80vw] max-w-80 mt-22 md:mt-0"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
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
