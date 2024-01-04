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

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  openForced?: boolean;
  setOpenForced?: React.Dispatch<React.SetStateAction<boolean>>;
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
  disabled,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const contextValue: DrawerContextType = {
    open,
    setOpen,
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const DrawerContext = React.createContext<DrawerContextType | undefined>(
    undefined
  );

  if (isDesktop) {
    return (
      <DrawerContext.Provider value={contextValue}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px] ">
            <DialogHeader>
              <div className="flex items-center gap-4 ">
                {icon}
                <div className="flex flex-col ">
                  <DialogTitle>{title}</DialogTitle>
                  <DialogDescription>{description}</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      </DrawerContext.Provider>
    );
  }

  return (
    <DrawerContext.Provider value={contextValue}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>

          <div className="px-4">{children}</div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button type="button" variant="outline">
                Annuler
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </DrawerContext.Provider>
  );
}
