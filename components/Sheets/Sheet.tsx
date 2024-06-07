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
  Sheet as SheetComponent,
} from "../ui/sheet";

interface Props {
  title?: string;
  description?: string;
  triggerText?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function Sheet({
  triggerText,
  title,
  description,
  children,
  icon,
}: Props) {
  return (
    <div className="fixed bottom-4 right-4">
      <SheetComponent>
        <SheetTrigger asChild>
          <Button className="rounded-full" iconComponent={icon}>
            {triggerText}
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">{children}</div>
        </SheetContent>
      </SheetComponent>
    </div>
  );
}
