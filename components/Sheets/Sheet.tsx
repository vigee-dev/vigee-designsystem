import { Button } from "../ui/button";
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

import { PlusIcon } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function SheetTriggered({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="fixed bottom-4 right-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="rounded-full" variant="outline">
            <PlusIcon className="h-6 w-6" />
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
