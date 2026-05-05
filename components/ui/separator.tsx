/**
 * @description Ligne de séparation visuelle horizontale ou verticale basée sur Radix UI, accessible et stylée avec la couleur `border` du thème.
 * @useWhen diviser des sections dans une carte ou un panneau → utiliser Separator | séparer des items dans un menu ou une liste → utiliser Separator | tracer une ligne entre un header et son contenu → utiliser Separator
 * @dontUseFor structurer des blocs de contenu avec espacement → utiliser Container | créer des sections titrées → utiliser SectionHeading
 * @example <Separator orientation="horizontal" />
 */
"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";
import { cn } from "../lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
