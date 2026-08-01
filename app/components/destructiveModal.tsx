import {
  Button,
  Card,
  CardActions,
  CardText,
  CardTitle,
  Dialog,
} from "@barrelrolla/react-components-library";
import { PiWarning, PiWarningBold } from "react-icons/pi";

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
  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <Card className="w-[90vw] max-w-60">
        <form action={action}>
          <CardTitle className="font-heading">{title}</CardTitle>
          <CardText className="text-4xl flex justify-center w-full">
            <PiWarning className="text-error-content" />
          </CardText>
          <CardText className="text-center">Are you sure?</CardText>
          <CardActions className="flex justify-between w-full">
            <Button size="sm" type="button" onClick={() => setIsOpen(false)}>
              NO
            </Button>
            <Button size="sm" color="error">
              YES
            </Button>
          </CardActions>
        </form>
      </Card>
    </Dialog>
  );
}
