"use client";

import Back from "../Buttons/Back";
import { cn } from "../lib/utils";
import { Drawer as VaulDrawer } from "vaul";

export function Drawer({
  children,
  trigger,
  title,
  description,
  open,
  onClose,
  onOpenChange,
  className,
  cancelable = false,
  fullScreen = false,
  classNameContent = "",
}: {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  open?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  cancelable?: boolean;
  fullScreen?: boolean;
  classNameContent?: string;
}) {
  return (
    <VaulDrawer.Root open={open} onClose={onClose} onOpenChange={onOpenChange}>
      <VaulDrawer.Trigger className="">{trigger}</VaulDrawer.Trigger>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/40" />
        <VaulDrawer.Content
          className={cn("bg-white flex flex-col fixed z-50 bottom-0 left-0 right-0 max-h-[92vh] rounded-t-[10px]", className, fullScreen && "min-h-dvh rounded-none bg-background-light")}>
          <div className={cn(`max-w-lg w-full mx-auto overflow-auto p-4 rounded-t-[10px]`, classNameContent)}>
            <VaulDrawer.Handle />
            {cancelable && <Back where="retour" onClick={onClose} />}
            <VaulDrawer.Title className="font-bold text-gray-900 mt-8 text-lg">{title}</VaulDrawer.Title>
            <VaulDrawer.Description className="leading-6 mt-2 text-gray-600 pb-4">{description}</VaulDrawer.Description>
            {children}
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
