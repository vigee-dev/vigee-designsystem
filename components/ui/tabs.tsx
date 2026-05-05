/**
 * @description Primitives d'onglets Radix UI stylisées Vigee : conteneur, barre de navigation, déclencheur et panneau de contenu.
 * @useWhen segmenter une page en vues alternatives (ex: Détails / Historique / Documents) → utiliser Tabs+TabsList+TabsTrigger+TabsContent | navigation par onglets simple sur desktop → utiliser Tabs | besoin d'accessibilité clavier native sur les onglets → utiliser Tabs
 * @dontUseFor navigation responsive mobile/desktop → utiliser TabsResponsive | onglets sur mobile avec swipe → utiliser TabMobile
 * @example <Tabs defaultValue="details"><TabsList><TabsTrigger value="details">Détails</TabsTrigger></TabsList><TabsContent value="details">Contenu</TabsContent></Tabs>
 */
'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { cn } from '../lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-fit items-center justify-center rounded-md bg-muted p-1 text-muted-foreground font-display',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center font-display whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-display',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
