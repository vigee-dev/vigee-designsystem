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
}

// SET THE FORM AS CHILDREN
// SEND A BUTTON IN YOUR PAGE AS TRIGGER
{
  /* <DrawerMobile
title="Titre"
description="Bonjour"
trigger={<Button variant="outline">Nouveau</Button>}
> {children} </DrawerMobile>*/
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
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" disabled={disabled}>
                Enregistrer
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        <div className="px-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
