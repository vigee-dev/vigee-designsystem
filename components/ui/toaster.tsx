/**
 * @description Conteneur global qui affiche les toasts déclenchés via `useToast()` — à placer une seule fois dans le layout racine.
 * @useWhen layout racine de l'app → placer `<Toaster />` une fois pour activer le système de notifications | feedback utilisateur (succès, erreur, info) déclenché depuis n'importe quel composant via `useToast()`
 * @dontUseFor messages persistants visibles en page → utiliser AlertInfo | modales de confirmation bloquantes → utiliser AlertDialog
 * @example <Toaster />
 */
"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { useToast } from "./use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
