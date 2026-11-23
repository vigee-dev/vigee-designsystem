/**
 * @description Une ventilation en liste : chaque ligne a son libellé, une barre fine à sa part, le nombre et le pourcentage ; une ligne qui a des sous-lignes se déplie sur elles (élément natif `details`, sans état).
 * @useWhen répartir un total par lieu, source ou catégorie (pays, puis régions de France) → utiliser BreakdownList | une ventilation secondaire au pied d'un KpiPanel → utiliser BreakdownList
 * @dontUseFor plusieurs colonnes de chiffres par ligne → utiliser Tables | une évolution dans le temps → utiliser un graphe (Charts) | des étapes qui se suivent → utiliser FunnelSteps
 * @example <BreakdownList title="Pays" subtitle="30 derniers jours" rows={[{ id: "france", label: "France", value: "1 032", percent: 87, children: regions }]} note="D'après l'adresse IP, approximatif" testIdPrefix="leads-dashboard-site-country" />
 */
import * as React from "react";
import { PiChevronRightStroke } from "../../icons/PikaIcons";
import { cn } from "../lib/utils";

export interface BreakdownRow {
  /** Identifiant stable, repris dans le data-testid de la ligne. */
  id: string;
  label: string;
  /** Le nombre, déjà formaté s'il le faut (« 1 032 »). */
  value: string | number;
  /** La part du total, de 0 à 100 : la barre et le pourcentage affiché. */
  percent: number;
  /** Les sous-lignes : la ligne se déplie sur elles. */
  children?: BreakdownRow[];
}

interface BreakdownListProps {
  title: string;
  subtitle?: string;
  rows: BreakdownRow[];
  /** La mention grise sous la liste (méthode, données manquantes). */
  note?: string;
  /** Préfixe des data-testid : `<prefix>-item-<id>`, `<prefix>-expand-area`. */
  testIdPrefix?: string;
  className?: string;
  "data-testid"?: string;
}

function Line({ row, muted = false, expandable = false }: { row: BreakdownRow; muted?: boolean; expandable?: boolean }) {
  return (
    <div className="grid grid-cols-[1fr_auto_3rem] items-center gap-x-3 rounded-xl px-2 py-2 transition-colors hover:bg-white">
      <div className="min-w-0">
        <div className="flex items-center gap-1">
          <span className={cn("truncate text-sm", muted ? "text-slate-600" : "text-slate-900")}>{row.label}</span>
          {expandable && <PiChevronRightStroke className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" aria-hidden />}
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-200/70" aria-hidden>
          <div className={cn("h-full rounded-full", muted ? "bg-slate-300" : "bg-slate-500")} style={{ width: `${Math.min(100, Math.max(row.percent, 2))}%` }} />
        </div>
      </div>
      <span className="text-sm font-medium text-slate-900">{row.value}</span>
      <span className="text-right text-xs text-slate-400">{row.percent} %</span>
    </div>
  );
}

export function BreakdownList({ title, subtitle, rows, note, testIdPrefix = "breakdown", className, "data-testid": dataTestId }: BreakdownListProps) {
  if (rows.length === 0) return null;
  return (
    <div className={cn("min-w-0", className)} data-testid={dataTestId}>
      <h3 className="text-sm font-semibold text-slate-900">
        {title}
        {subtitle && <span className="font-normal text-slate-400"> · {subtitle}</span>}
      </h3>
      <ul className="-mx-2 mt-3 flex flex-col">
        {rows.map((row) =>
          row.children && row.children.length > 0 ? (
            <li key={row.id} data-testid={`${testIdPrefix}-item-${row.id}`}>
              <details className="group">
                <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden" data-testid={`${testIdPrefix}-${row.id}-expand-area`}>
                  <Line row={row} expandable />
                </summary>
                <ul className="mb-1 ml-4 border-l border-slate-200 pl-2">
                  {row.children.map((child) => (
                    <li key={child.id} data-testid={`${testIdPrefix}-${row.id}-item-${child.id}`}>
                      <Line row={child} muted />
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ) : (
            <li key={row.id} data-testid={`${testIdPrefix}-item-${row.id}`}>
              <Line row={row} />
            </li>
          ),
        )}
      </ul>
      {note && <p className="mt-2 text-xs text-slate-400">{note}</p>}
    </div>
  );
}

export default BreakdownList;
