import { PropsWithChildren, Ref } from "react";
import { Card, CardTitle, Dialog } from "@barrelrolla/react-components-library";

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
      backdropClasses="items-start md:items-center backdrop-blur-[2px]"
      className="mt-22 md:mt-0"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <Card containerClasses="min-w-70 w-70 md:min-w-80 md:w-80">
        <CardTitle className="font-heading">{title}</CardTitle>
        <form
          action={formAction}
          ref={formRef}
          className="flex flex-col p-4 pt-0 gap-2 text-sm"
        >
          {children}
        </form>
      </Card>
    </Dialog>
  );
}
