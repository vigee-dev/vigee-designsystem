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
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
}

export default function SheetTriggered({
  trigger,
  title,
  description,
  children,
  side = "right",
}: Props) {
  return (
    <Sheet>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader className="text-left flex pb-4">
          <SheetTitle className="text-primary">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
