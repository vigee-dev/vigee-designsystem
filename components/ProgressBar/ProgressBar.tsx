/**
 * @description Barre de progression horizontale centrée avec pourcentage et texte optionnel sous la barre.
 * @useWhen upload de fichier en cours → afficher l'avancement | traitement serveur asynchrone → indiquer la progression | onboarding multi-étapes → visualiser le taux de complétion
 * @dontUseFor progression par étapes nommées → utiliser Stepper | indicateur circulaire → utiliser ProgressCircle
 * @example <ProgressBar progress={72} text="72% complété" />
 */
"use client";

import { Progress } from "../ui/progress";

interface Props {
  progress: number;
  text?: string;
}

export function ProgressBar({ progress, text }: Props) {
  return (
    <div className="flex flex-col items-center">
      <Progress value={progress} className="w-[60%] bg-slate-300" />
      {text && <p className="mt-2 text-md text-gray-500">{text}</p>}
    </div>
  );
}
