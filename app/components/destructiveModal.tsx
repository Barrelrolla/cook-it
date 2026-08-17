import {
  Button,
  Card,
  CardActions,
  CardText,
  CardTitle,
  Dialog,
} from "@barrelrolla/react-components-library";
import { useTranslations } from "next-intl";
import { PiWarning } from "react-icons/pi";

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
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <Card className="w-[90vw] max-w-70">
        <form action={action}>
          <CardTitle className="font-heading">{title}</CardTitle>
          <CardText className="text-4xl flex justify-center w-full">
            <PiWarning className="text-error" />
          </CardText>
          <CardText className="text-center">{t("are-you-sure")}</CardText>
          <CardActions className="flex justify-between w-full">
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
          </CardActions>
        </form>
      </Card>
    </Dialog>
  );
}
