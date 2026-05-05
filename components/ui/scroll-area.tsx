/**
 * @description Zone de défilement personnalisée avec scrollbar stylisée Vigee, verticale ou horizontale, sans overflow natif visible.
 * @useWhen liste déroulante trop longue dans un Drawer ou Sheet → wrapper le contenu dans ScrollArea | sidebar avec navigation dense → limiter la hauteur et scroller proprement | tableau ou contenu débordant dans un Container contraint en hauteur → éviter l'overflow natif du navigateur
 * @dontUseFor défilement d'une page entière → utiliser le scroll natif du navigateur | listes avec pagination → utiliser Pagination
 * @example <ScrollArea className="h-72"><div>{items.map(i => <div key={i}>{i}</div>)}</div></ScrollArea>
 */
"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";
import { cn } from "../lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={"relative overflow-hidden"}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      className={cn("max-h-min h-full w-full rounded-[inherit]", className)}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
