"use client";
import * as React from "react";
import { Button } from "../ui/button";
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

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
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

export function DrawerMobile({ children, title, description, trigger }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        <div className="px-4">{children}</div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button type="submit">Enregistrer</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="outline">Annuler</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
