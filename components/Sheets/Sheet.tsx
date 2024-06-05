"use client";

import React from "react";
import { Button } from "../Buttons/Button";
import {
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetClose,
  SheetContent,
  Sheet,
} from "../ui/sheet";
import { useMediaQuery } from "@react-hook/media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg";
}

type SheetContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SheetContext = React.createContext<SheetContextType | undefined>(
  undefined
);

export function useSheetContext() {
  const context = React.useContext(SheetContext);
  if (context === undefined) {
    throw new Error(
      "useDrawerContext doit être utilisé à l'intérieur d'un SheetContext.Provider"
    );
  }
  return context;
}

export default function SheetTriggered({
  trigger,
  title,
  description,
  children,
  side = "bottom",
  icon,
  size = "md",
}: Props) {
  const [open, setOpen] = React.useState(false);
  const contextValue: SheetContextType = { open, setOpen };
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <SheetContext.Provider value={contextValue}>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={e => e.stopPropagation()} asChild>
              {trigger}
            </DialogTrigger>

            <DialogContent
              onClick={e => e.stopPropagation()}
              className={`max-w-[425px] max-h-[90vh] ${
                size === "sm"
                  ? "md:max-w-[425px]"
                  : size === "md"
                  ? "md:max-w-[650px]"
                  : "md:max-w-[1080px]"
              } `}
            >
              <DialogHeader>
                <div className="flex items-center gap-x-4 p-4 py-2">
                  {icon}
                  <div className="flex flex-col">
                    <DialogTitle className="text-primary">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <ScrollArea className="max-h-[75vh]">
                <div className="p-4">{children}</div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </SheetContext.Provider>
    );
  }

  return (
    <SheetContext.Provider value={contextValue}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="w-full">{trigger}</SheetTrigger>

        <SheetContent side={side} className="rounded-t-2xl">
          <SheetHeader className="text-left flex pb-4">
            <SheetTitle className="text-primary">{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <ScrollArea className="max-h-[75vh]">
            <div className="p-1">{children}</div>
          </ScrollArea>

          <SheetClose className="w-full flex justify-center items-center text-center pt-2">
            <Button icon="chevronDown" />
          </SheetClose>
        </SheetContent>
      </Sheet>
    </SheetContext.Provider>
  );
}
