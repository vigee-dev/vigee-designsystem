/**
 * @description Bloc de chargement animé (pulse) pour masquer le contenu en attente de données.
 * @useWhen contenu asynchrone en cours de chargement → remplacer temporairement texte/image/card | squelette de mise en page avant hydratation | placeholder visuel dans une liste ou tableau
 * @dontUseFor pages entières en chargement → utiliser LoaderPage | tableaux avec structure complexe → utiliser DashboardSkeleton
 * @example <Skeleton className="h-4 w-48 rounded" />
 */
import { cn } from "../lib/utils";
import * as React from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
