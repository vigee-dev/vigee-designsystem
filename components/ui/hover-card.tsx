/**
 * @description Carte flottante affichée au survol d'un élément déclencheur, pour révéler des infos contextuelles sans clic.
 * @useWhen survol d'un avatar/nom d'utilisateur pour afficher son profil → utiliser HoverCard | survol d'un libellé court pour afficher une description détaillée → utiliser HoverCard
 * @dontUseFor action à déclencher au clic → utiliser DropdownMenu | contenu riche interactif persistant → utiliser Sheet | message d'aide court sur une icône → utiliser Tooltip
 * @example <HoverCard><HoverCardTrigger>@utilisateur</HoverCardTrigger><HoverCardContent><p>Profil de l'utilisateur</p></HoverCardContent></HoverCard>
 */
"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as React from "react";
import { cn } from "../lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
