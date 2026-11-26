/**
 * @description Étapes verticales en pastilles (cochée, en cours, à venir) qui se déroulent vers le bas avec l'avancement ; chaque pastille peut être cliquable pour y placer l'avancement.
 * @useWhen sous-étapes d'une étape de frise (cadrage, développement) qu'on lit d'un coup d'œil et qu'on peut avancer ou faire revenir d'un clic → utiliser `StepTrail` | montrer ce qui est franchi, l'étape en cours et seulement la suivante → utiliser `StepTrail`
 * @dontUseFor formulaire découpé en étapes avec navigation suivant/précédent → utiliser Stepper | liste de vérifications réussies ou échouées → utiliser une liste à coches
 * @example <StepTrail steps={[{ key: "code", label: "Étude du code", mark: "done" }, { key: "internal", label: "Étude interne", mark: "current" }, { key: "validation", label: "Validation interne", mark: "next" }]} onSelect={(key) => move(key)} testIdPrefix="scoping-step" />
 */
"use client";

import { PiCheckTickCircleSolid } from "../../icons/PikaIcons";
import { Button } from "../Buttons/Button";
import { cn } from "../lib/utils";

export type StepTrailMark = "done" | "current" | "next";

export type StepTrailItem = {
  key: string;
  label: string;
  mark: StepTrailMark;
};

type Props = {
  steps: StepTrailItem[];
  /** Un clic sur une pastille ; sans lui, les pastilles se lisent seulement. */
  onSelect?: (key: string) => void;
  /** Clé de l'étape où l'on est : sa pastille n'est pas cliquable. */
  activeKey?: string;
  disabled?: boolean;
  /** Préfixe des data-testid : `${prefix}-${key}-btn`. */
  testIdPrefix?: string;
  className?: string;
};

/** La marque : cochée en vert, en cours (anneau ambre qui tourne), à venir en pointillé. */
function Mark({ mark }: { mark: StepTrailMark }) {
  if (mark === "done") return <PiCheckTickCircleSolid className="h-4 w-4 shrink-0 text-emerald-500" />;
  if (mark === "current") {
    return (
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-amber-200" />
        <span className="absolute inset-0 animate-[spin_1.2s_linear_infinite] rounded-full border-2 border-transparent border-t-amber-500 motion-reduce:animate-none" />
      </span>
    );
  }
  return <span className="h-4 w-4 shrink-0 rounded-full border-2 border-dashed border-slate-300" />;
}

const LABEL_CLASS: Record<StepTrailMark, string> = {
  current: "text-[13px] font-medium text-slate-800",
  done: "text-[13px] text-slate-500 hover:text-slate-700",
  next: "text-[13px] text-slate-400 hover:text-slate-600",
};

export function StepTrail({ steps, onSelect, activeKey, disabled, testIdPrefix = "step-trail", className }: Props) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} data-testid={`${testIdPrefix}-area`}>
      {steps.map(({ key, label, mark }) =>
        onSelect ? (
          <Button
            key={key}
            variant="ghost"
            onClick={() => onSelect(key)}
            disabled={disabled || key === activeKey}
            className="h-auto w-fit justify-start gap-2 p-0 hover:bg-transparent disabled:opacity-100"
            data-testid={`${testIdPrefix}-${key}-btn`}
          >
            <Mark mark={mark} />
            <span className={LABEL_CLASS[mark]}>{label}</span>
          </Button>
        ) : (
          <span key={key} className="flex items-center gap-2" data-testid={`${testIdPrefix}-${key}`}>
            <Mark mark={mark} />
            <span className={LABEL_CLASS[mark]}>{label}</span>
          </span>
        ),
      )}
    </div>
  );
}
