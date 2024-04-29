import { PiNotebookDuoSolid } from "../../icons/PikaIcons";
import { Button } from "../Buttons/Button";
import {
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetClose,
  SheetFooter,
  SheetContent,
  Sheet,
} from "../ui/sheet";

interface Props {
  title?: string;
  description?: string;
  triggerText?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function SheetTriggered({
  triggerText,
  title,
  description,
  children,
  icon,
}: Props) {
  return (
    <div className="fixed bottom-4 right-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="rounded-full" iconComponent={icon}>
            {triggerText}
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">{children}</div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
