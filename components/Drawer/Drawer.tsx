"use client";

import { Drawer as VaulDrawer } from "vaul";
import Back from "../Buttons/Back";
import { cn } from "../lib/utils";

export function Drawer({
  children,
  trigger,
  title,
  description,
  icon,
  open,
  onClose,
  onOpenChange,
  className,
  cancelable = false,
  fullScreen = false,
  classNameContent = "",
  dismissible = true,
  headerComponent,
}: {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  cancelable?: boolean;
  fullScreen?: boolean;
  classNameContent?: string;
  dismissible?: boolean;
  headerComponent?: React.ReactNode;
}) {
  return (
    <VaulDrawer.Root
      open={open}
      onClose={onClose}
      onOpenChange={onOpenChange}
      dismissible={dismissible}
    >
      <VaulDrawer.Trigger className="w-full" asChild>
        {trigger}
      </VaulDrawer.Trigger>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/40" />
        <VaulDrawer.Content
          className={cn(
            "bg-white flex flex-col fixed z-50 bottom-0 left-0 right-0 max-h-[92vh] rounded-t-[10px]",
            className,
            fullScreen && "min-h-dvh rounded-none bg-background"
          )}
        >
          <div
            className={cn(
              `max-w-lg w-full mx-auto overflow-auto p-4 rounded-t-[10px]`,
              classNameContent,
              fullScreen && "rounded-none"
            )}
          >
            <VaulDrawer.Handle />
            {cancelable && <Back where="retour" onClick={onClose} />}
            <div className="flex items-center gap-4">
              {icon}
              {title || description ? (
                <div className="flex justify-between w-full">
                  <div className="flex flex-col">
                    <VaulDrawer.Title className="font-bold text-gray-900 mt-8 text-lg">
                      {title}
                    </VaulDrawer.Title>
                    <VaulDrawer.Description className="leading-6  text-gray-600 pb-4">
                      {description}
                    </VaulDrawer.Description>
                  </div>
                  {headerComponent}
                </div>
              ) : null}
            </div>
            {children}
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
