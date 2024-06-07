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
import { cn } from "../lib/utils";

interface Props {
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg";
  scroll?: boolean;
  sheet?: boolean;
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
  scroll = true,
  sheet = false,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const contextValue: SheetContextType = { open, setOpen };
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop && !sheet) {
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

              <div
                className={cn(
                  "p-1 max-h-[80vh]",
                  scroll && "overflow-y-scroll"
                )}
              >
                {children}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </SheetContext.Provider>
    );
  }

  return (
    <SheetContext.Provider value={contextValue}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="w-full" onClick={e => e.stopPropagation()}>
          {trigger}{" "}
        </SheetTrigger>

        <SheetContent
          side={side}
          className={`rounded-t-2xl lg:max-w-screen-lg overflow-y-scroll max-h-[90vh]`}
          onClick={e => e.stopPropagation()}
        >
          <SheetHeader className="text-left flex pb-4">
            <SheetTitle className="text-primary">{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>

          <div
            className={cn("p-1 max-h-[80vh] ", scroll && "overflow-y-scroll")}
          >
            {" "}
            {children}
          </div>

          <SheetClose className="w-full flex justify-center items-center text-center pt-2">
            <Button icon="chevronDown" />
          </SheetClose>
        </SheetContent>
      </Sheet>
    </SheetContext.Provider>
  );
}
