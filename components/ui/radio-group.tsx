/**
 * @description Groupe de boutons radio Radix UI pour sélection exclusive parmi plusieurs options dans un formulaire Vigee.
 * @useWhen choix unique parmi options fixes (civilité, statut, type) → utiliser RadioGroup | intégration dans Form react-hook-form avec champ contrôlé → utiliser RadioGroup + RadioGroupItem | alternatives visuelles en liste verticale ou grille → utiliser RadioGroup
 * @dontUseFor sélection multiple → utiliser Checkboxes | liste d'options longue avec recherche → utiliser Select | activation/désactivation binaire → utiliser Switch
 * @example <RadioGroup defaultValue="option1"><RadioGroupItem value="option1" id="o1" /><RadioGroupItem value="option2" id="o2" /></RadioGroup>
 */
"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "../lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
