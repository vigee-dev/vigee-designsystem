/**
 * @description Interrupteur bascule (on/off) basé sur Radix UI Switch, pour activer ou désactiver une option de façon binaire.
 * @useWhen activation/désactivation d'une fonctionnalité (notifications, mode sombre) → utiliser Switch | préférence utilisateur booléenne dans un formulaire de settings → utiliser Switch
 * @dontUseFor choix parmi plusieurs options → utiliser ui/Tabs ou ui/RadioGroup | cases à cocher indépendantes dans une liste → utiliser ui/Checkbox
 * @example <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
 */
"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";
import { cn } from "../lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
