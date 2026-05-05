/**
 * @description Groupe de boutons toggle mutuellement exclusifs ou à sélection multiple, basé sur Radix UI, avec variants et tailles partagés.
 * @useWhen sélection d'un mode parmi plusieurs options (vue liste/grille/carte) → utiliser ToggleGroup | filtre visuel par type avec état actif visible → utiliser ToggleGroup | barre d'outils avec options activables groupées → utiliser ToggleGroup
 * @dontUseFor sélection multiple avec labels longs → utiliser MultiSelect | navigation entre vues avec URL → utiliser TabsResponsive | filtres combinables avec recherche → utiliser CheckboxFilter
 * @example <ToggleGroup type="single" defaultValue="list"><ToggleGroupItem value="list">Liste</ToggleGroupItem><ToggleGroupItem value="grid">Grille</ToggleGroupItem></ToggleGroup>
 */
"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";
import { toggleVariants } from "./toggle";
import { ReactElement } from "react";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children as ReactElement}{" "}
      {/* TOIMPROVE why type assertion is needed here ? */}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
