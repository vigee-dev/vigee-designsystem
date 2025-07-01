"use client";

import React, { useState, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "../Buttons/Button";
import {
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetClose,
  SheetContent,
  Sheet as SheetComponent
} from "../ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { cn } from "../lib/utils";

const sizeVariants = cva("", {
  variants: {
    size: {
      sm: "max-w-[425px]",
      md: "max-w-[650px]",
      lg: "max-w-[1080px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface SheetDialogControlledProps extends VariantProps<typeof sizeVariants> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  scroll?: boolean;
  forceSheet?: boolean;
  className?: string;
}

interface HeaderProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  variant: "dialog" | "sheet";
}

function ResponsiveHeader({ title, description, icon, variant }: HeaderProps) {
  const TitleComponent = variant === "dialog" ? DialogTitle : SheetTitle;
  const DescriptionComponent = variant === "dialog" ? DialogDescription : SheetDescription;
  const HeaderComponent = variant === "dialog" ? DialogHeader : SheetHeader;

  return (
    <HeaderComponent className={variant === "sheet" ? "text-left pb-4" : ""}>
      <div className="flex items-center gap-x-4 p-4 py-2">
        {icon}
        <div className="flex flex-col">
          <TitleComponent className="text-primary">{title}</TitleComponent>
          <DescriptionComponent>{description}</DescriptionComponent>
        </div>
      </div>
    </HeaderComponent>
  );
}

export default function SheetDialogControlled({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  side = "bottom",
  icon,
  size = "md",
  scroll = true,
  forceSheet = false,
  className,
}: SheetDialogControlledProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const triggerWithHandler = trigger ? React.cloneElement(
    trigger as React.ReactElement,
    {
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        const originalOnClick = (trigger as React.ReactElement).props?.onClick;
        if (originalOnClick) {
          originalOnClick(e);
        }
        onOpenChange(true);
      }
    }
  ) : null;

  if (forceSheet || !isDesktop) {
    return (
      <SheetComponent open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          {triggerWithHandler}
        </SheetTrigger>
        <SheetContent
          side={side}
          className={cn(
            "rounded-t-2xl lg:max-w-screen-lg max-h-dvh",
            scroll && "overflow-y-auto",
            className
          )}
        >
          <ResponsiveHeader
            title={title}
            description={description}
            icon={icon}
            variant="sheet"
          />
          <div className="p-1">
            {children}
          </div>
          <SheetClose className="w-full flex justify-center items-center text-center pt-2">
            <Button icon="chevronDown" />
          </SheetClose>
        </SheetContent>
      </SheetComponent>
    );
  }

  // Desktop: utilise Dialog
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {triggerWithHandler}
      </DialogTrigger>
      <DialogContent
        className={cn(
          sizeVariants({ size }),
          className
        )}
      >
        <ResponsiveHeader
          title={title}
          description={description}
          icon={icon}
          variant="dialog"
        />
        <div className={cn("p-1 max-h-[80vh]", scroll && "overflow-y-auto")}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export type { SheetDialogControlledProps };
