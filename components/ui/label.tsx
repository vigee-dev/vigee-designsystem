/**
 * @description Label accessible Radix UI, stylisé Vigee, à associer à un champ de formulaire via `htmlFor`.
 * @useWhen associer un libellé à un Input, Select ou Checkbox natif | afficher un label désactivé (grisé automatiquement via `peer-disabled`) | construire un champ custom sans passer par les composants Forms Vigee
 * @dontUseFor champs dans un Form Vigee → la prop `label` des composants Forms (Input, Select, etc.) gère déjà le Label | texte décoratif sans lien avec un champ → utiliser la typographie standard
 * @example <Label htmlFor="email">Adresse e-mail</Label>
 */
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
