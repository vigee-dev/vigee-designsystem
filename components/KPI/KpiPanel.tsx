/**
 * @description Bloc unique d'un tableau de bord : titre et période en tête, commande à droite (pastille « en direct », filtre), contenu libre, pied de bloc sur fond gris doux ; halo de couleur très léger en haut à gauche, derrière le chiffre principal.
 * @useWhen réunir dans un seul bloc tout ce qui raconte un même sujet (le site, une campagne, un produit) : chiffre héros, étapes, ventilations → utiliser KpiPanel | mettre une ventilation secondaire (pays, campagnes) sous le contenu principal → passer `footer`
 * @dontUseFor plusieurs indicateurs indépendants côte à côte → utiliser StatWidgetGroup | un indicateur isolé → utiliser StatWidget | une page de chiffres au style épuré → utiliser epure/EpurePage et EpureCard de l'application
 * @example <KpiPanel title="Site" subtitle="30 derniers jours" action={<LivePill />} footer={<BreakdownList title="Pays" rows={rows} />} data-testid="leads-dashboard-site"><FunnelSteps steps={steps} /></KpiPanel>
 */
import * as React from "react";
import { cn } from "../lib/utils";

const HALOS = {
  emerald: "bg-emerald-100/40",
  indigo: "bg-indigo-100/40",
  amber: "bg-amber-100/40",
  none: "",
} as const;

export type KpiPanelHalo = keyof typeof HALOS;

interface KpiPanelProps {
  /** Le sujet du bloc, en tête (« Site »). */
  title: string;
  /** Ce qui le précise, en gris après le titre (« 30 derniers jours »). */
  subtitle?: string;
  /** Commande ou pastille à droite du titre. */
  action?: React.ReactNode;
  /** Le contenu principal ; sa grille est celle du consommateur. */
  children: React.ReactNode;
  /** Le pied de bloc, sur fond gris doux, séparé par un filet. */
  footer?: React.ReactNode;
  /** La couleur du halo derrière le haut du bloc ; `none` pour l'ôter. */
  halo?: KpiPanelHalo;
  className?: string;
  "data-testid"?: string;
}

export function KpiPanel({ title, subtitle, action, children, footer, halo = "emerald", className, "data-testid": dataTestId }: KpiPanelProps) {
  return (
    <section className={cn("relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm", className)} data-testid={dataTestId}>
      {halo !== "none" && (
        <div aria-hidden className={cn("pointer-events-none absolute -left-40 -top-48 h-[28rem] w-[28rem] rounded-full blur-3xl", HALOS[halo])} />
      )}
      <header className="relative flex flex-wrap items-center justify-between gap-3 px-6 pt-6 md:px-10 md:pt-8">
        <h2 className="text-sm font-semibold text-slate-900">
          {title}
          {subtitle && <span className="font-normal text-slate-400"> · {subtitle}</span>}
        </h2>
        {action}
      </header>
      <div className="relative px-6 pb-8 pt-8 md:px-10 md:pb-10">{children}</div>
      {footer && <div className="relative border-t border-slate-100 bg-slate-50/70 px-6 py-8 md:px-10">{footer}</div>}
    </section>
  );
}

export default KpiPanel;
