/**
 * @description Groupe de StatWidget sous un titre de section discret (slate grisé) avec grille responsive. Structure les sous-groupes thématiques d'un dashboard cockpit.
 * @useWhen regrouper plusieurs StatWidget sous un thème (Finances, Commercial…) → utiliser StatWidgetGroup | titrer une section de KPI sur une page de pilotage → utiliser StatWidgetGroup
 * @dontUseFor un KPI isolé → utiliser StatWidget seul | une grille de métriques compactes → utiliser NumberKPI
 * @example <StatWidgetGroup title="Finances" action={<button>Détail</button>}><StatWidget label="ARR" value={4200} unit="€" /></StatWidgetGroup>
 */
import * as React from "react";
import { cn } from "../lib/utils";

interface StatWidgetGroupProps {
  /** Titre de la section (rendu en slate grisé, uppercase léger). */
  title: string;
  /** Nombre de colonnes desktop (défaut 3). */
  columns?: 1 | 2 | 3 | 4;
  /** Élément optionnel aligné à droite du titre (bouton discret…). */
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  "data-testid"?: string;
}

const COLUMN_CLASS: Record<NonNullable<StatWidgetGroupProps["columns"]>, string> =
  {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

export const StatWidgetGroup = ({
  title,
  columns = 3,
  action,
  children,
  className,
  "data-testid": dataTestId,
}: StatWidgetGroupProps) => {
  return (
    <section
      data-testid={dataTestId}
      className={cn("mt-8 first:mt-0", className)}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </h2>
        {action}
      </div>
      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          COLUMN_CLASS[columns]
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default StatWidgetGroup;
