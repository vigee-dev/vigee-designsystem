"use client";

import React from "react";
import { Button } from "../Buttons/Button";
import { SheetTrigger, SheetTitle, SheetDescription, SheetHeader, SheetClose, SheetContent, Sheet as SheetComponent } from "../ui/sheet";
import { useMediaQuery } from "@react-hook/media-query";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

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

const SheetContext = React.createContext<SheetContextType | undefined>(undefined);

export function useSheetContext() {
  const context = React.useContext(SheetContext);
  if (context === undefined) {
    throw new Error("useDrawerContext doit être utilisé à l'intérieur d'un SheetContext.Provider");
  }
  return context;
}

export default function SheetDialog({ trigger, title, description, children, side = "bottom", icon, size = "md", scroll = true, sheet = false }: Props) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const contextValue: SheetContextType = { open, setOpen };
  const isDesktop = useMediaQuery("(min-width: 768px)");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <SheetContext.Provider value={contextValue}>
        <div>{trigger}</div>
      </SheetContext.Provider>
    );
  }

  if (isDesktop && !sheet) {
    return (
      <SheetContext.Provider value={contextValue}>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={e => e.stopPropagation()} asChild>
              {trigger}
            </DialogTrigger>

            <DialogContent onPointerDown={e => e.stopPropagation()} onClick={e => e.stopPropagation()} className={`max-w-[425px]  ${size === "sm" ? "md:max-w-[425px]" : size === "md" ? "md:max-w-[650px]" : "md:max-w-[1080px]"} `}>
              <DialogHeader>
                <div className="flex items-center gap-x-4 p-4 py-2">
                  {icon}
                  <div className="flex flex-col">
                    <DialogTitle className="text-primary">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className={cn("p-1 max-h-[80vh]", scroll && "overflow-y-auto")}>{children}</div>
            </DialogContent>
          </Dialog>
        </div>
      </SheetContext.Provider>
    );
  }

  return (
    <SheetContext.Provider value={contextValue}>
      <SheetComponent open={open} onOpenChange={setOpen}>
        <SheetTrigger className="w-full" onClick={e => e.stopPropagation()}>
          {trigger}
        </SheetTrigger>

        <SheetContent side={side} className={`rounded-t-2xl lg:max-w-screen-lg max-h-dvh overflow-y-auto`} onPointerDown={e => e.stopPropagation()} onClick={e => e.stopPropagation()}>
          <SheetHeader className="text-left flex pb-4">
            <SheetTitle className="text-primary">{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>

          <div className={cn("p-1")}>{children}</div>

          <SheetClose className="w-full flex justify-center items-center text-center pt-2">
            <Button icon="chevronDown" />
          </SheetClose>
        </SheetContent>
      </SheetComponent>
    </SheetContext.Provider>
  );
}
