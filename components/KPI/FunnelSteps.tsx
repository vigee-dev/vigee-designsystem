/**
 * @description Les étapes d'un parcours en lignes fines : icône, libellé, barre fine à la part de l'étape d'avant, ligne de détail colorée dans le sens de l'écart, et le chiffre à droite ; une étape mise en avant passe en vert.
 * @useWhen montrer un entonnoir (visites → échanges → rendez-vous, prospects → signés) avec la part de chaque étape → utiliser FunnelSteps | lister quelques indicateurs liés, chiffre à droite, dans un KpiPanel → utiliser FunnelSteps
 * @dontUseFor des indicateurs sans lien entre eux → utiliser StatWidget | une évolution dans le temps → utiliser un graphe (Charts) | un tableau de plusieurs colonnes → utiliser Tables
 * @example <FunnelSteps steps={[{ id: "conversations", label: "Échanges", value: 41, detail: "3 % des visites", barPercent: 3, icon: <PiChatChattingStroke /> }]} testIdPrefix="leads-dashboard-site" />
 */
import * as React from "react";
import { cn } from "../lib/utils";

export type FunnelStepTone = "neutral" | "positive" | "negative";

export interface FunnelStep {
  /** Identifiant stable, repris dans le data-testid de la ligne. */
  id: string;
  label: string;
  /** Le chiffre, déjà formaté s'il le faut (« 1 248 »). */
  value: string | number;
  /** La ligne grise sous le libellé (« 41 % des échanges », « +12 % sur 30 jours »). */
  detail?: string;
  /** La couleur du détail : vert pour une hausse, rouge pour une baisse. */
  detailTone?: FunnelStepTone;
  /** La largeur de la barre fine, de 0 à 100 ; absente, pas de barre. */
  barPercent?: number | null;
  /** Icône Pika en trait, colorée par la ligne. */
  icon?: React.ReactNode;
  /** L'étape qui compte (rendez-vous pris) : chiffre, barre et icône en vert. */
  highlight?: boolean;
  /** Un chiffre nul passe en gris clair. */
  muted?: boolean;
}

interface FunnelStepsProps {
  steps: FunnelStep[];
  /** Préfixe des data-testid : `<prefix>-steps`, `<prefix>-item-<id>`. */
  testIdPrefix?: string;
  className?: string;
}

const DETAIL_TONE: Record<FunnelStepTone, string> = {
  neutral: "text-slate-400",
  positive: "font-medium text-emerald-600",
  negative: "font-medium text-rose-600",
};

function StepRow({ step, testIdPrefix }: { step: FunnelStep; testIdPrefix: string }) {
  const bar = step.barPercent === null || step.barPercent === undefined ? null : Math.min(100, Math.max(0, step.barPercent));
  return (
    <li
      className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 border-b border-slate-100 py-5 first:pt-1 last:border-b-0 last:pb-1"
      data-testid={`${testIdPrefix}-item-${step.id}`}
    >
      <span className={cn("flex [&_svg]:h-[18px] [&_svg]:w-[18px]", step.highlight ? "text-emerald-500" : "text-slate-400")} aria-hidden>
        {step.icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[15px] text-slate-900">{step.label}</p>
        {bar !== null && (
          <div className="mt-2 h-1 w-full max-w-[240px] overflow-hidden rounded-full bg-slate-100" aria-hidden>
            <div className={cn("h-full rounded-full", step.highlight ? "bg-emerald-500" : "bg-slate-800")} style={{ width: `${bar}%` }} />
          </div>
        )}
        {step.detail && <p className={cn("mt-1.5 text-xs", DETAIL_TONE[step.detailTone ?? "neutral"])}>{step.detail}</p>}
      </div>
      <p
        className={cn(
          "text-[28px] font-medium leading-none tracking-[-0.03em]",
          step.highlight ? "text-emerald-600" : step.muted ? "text-slate-300" : "text-slate-900",
        )}
      >
        {step.value}
      </p>
    </li>
  );
}

export function FunnelSteps({ steps, testIdPrefix = "funnel", className }: FunnelStepsProps) {
  return (
    <ol className={cn("flex flex-col", className)} data-testid={`${testIdPrefix}-steps`}>
      {steps.map((step) => (
        <StepRow key={step.id} step={step} testIdPrefix={testIdPrefix} />
      ))}
    </ol>
  );
}

export default FunnelSteps;
