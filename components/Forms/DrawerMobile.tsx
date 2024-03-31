"use client";
import * as React from "react";
import { Button } from "../ui/button";
import { useMediaQuery } from "@react-hook/media-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  title?: string;
  description?: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  openForced?: boolean;
  cancelButton?: boolean;
  setOpenForced?: React.Dispatch<React.SetStateAction<boolean>>;
  size?: "sm" | "md" | "lg";
}

type DrawerContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DrawerContext = React.createContext<DrawerContextType | undefined>(
  undefined
);

export function useDrawerContext() {
  const context = React.useContext(DrawerContext);
  if (context === undefined) {
    throw new Error(
      "useDrawerContext doit être utilisé à l'intérieur d'un DrawerContext.Provider"
    );
  }
  return context;
}

export function DrawerMobile({
  children,
  title,
  description,
  trigger,
  icon,
  cancelButton,
  size = "sm",
}: Props) {
  const [open, setOpen] = React.useState(false);

  const contextValue: DrawerContextType = { open, setOpen };

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <DrawerContext.Provider value={contextValue}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger onClick={e => e.stopPropagation()} asChild>
            {trigger}
          </DialogTrigger>
          <DialogContent
            onClick={e => e.stopPropagation()}
            className={`max-w-[425px]  ${
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

            {size !== "sm" ? (
              <ScrollArea className="max-h-[80vh] pb-8">{children}</ScrollArea>
            ) : (
              <div className="p-4">{children}</div>
            )}
          </DialogContent>
        </Dialog>
      </DrawerContext.Provider>
    );
  }

  return (
    <DrawerContext.Provider value={contextValue}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger onClick={e => e.stopPropagation()} asChild>
          {trigger}
        </DrawerTrigger>
        <DrawerContent onClick={e => e.stopPropagation()}>
          <DrawerHeader className="text-left">
            {title && (
              <DrawerTitle className="font-bold text-primary">
                {title}
              </DrawerTitle>
            )}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>

          <ScrollArea className="max-h-[80vh] pb-8">
            <div className="p-4">{children}</div>
          </ScrollArea>

          {cancelButton && (
            <DrawerFooter>
              <DrawerClose asChild>
                <Button type="button" variant="outline">
                  Annuler
                </Button>
              </DrawerClose>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </DrawerContext.Provider>
  );
}
