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
  DrawerOverlay,
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
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger onClick={e => e.stopPropagation()} asChild>
              {trigger}
            </DialogTrigger>

            <ScrollArea className="max-h-[80vh] ">
              <DialogContent
                onClick={e => e.stopPropagation()}
                className={`max-w-[425px] ${
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
                      <DialogTitle className="text-primary">
                        {title}
                      </DialogTitle>
                      <DialogDescription>{description}</DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <div className="p-4">{children}</div>
              </DialogContent>
            </ScrollArea>
          </Dialog>
        </div>
      </DrawerContext.Provider>
    );
  }

  return (
    <DrawerContext.Provider value={contextValue}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger onClick={e => e.stopPropagation()} asChild>
          {trigger}
        </DrawerTrigger>
        <DrawerOverlay className="fixed inset-0 bg-black/40" />
        <DrawerContent
          onClick={e => e.stopPropagation()}
          className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]"
        >
          <div className="text-[16px] ">
            <ScrollArea className="max-h-[80vh] pb-8 ">
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
          </div>
        </DrawerContent>
      </Drawer>
    </DrawerContext.Provider>
  );
}
