/**
 * @description Toaster Sonner adapté au thème Vigee (light/dark/system) à monter une seule fois dans le layout racine.
 * @useWhen mise en place des notifications toast dans le layout racine → monter `<Toaster />` | afficher des retours utilisateur (succès, erreur, info) via `toast()` de sonner dans n'importe quel composant enfant.
 * @dontUseFor feedback bloquant nécessitant une confirmation → utiliser AlertDialog | messages persistants contextuels dans la page → utiliser AlertInfo.
 * @example <Toaster />
 */
"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
