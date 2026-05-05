/**
 * @description États visuels internes du DocumentViewer : chargement global, message vide, et squelette de page PDF en cours de rendu.
 * @useWhen document en cours de fetch → utiliser `LoadingState` | aucun document disponible ou erreur métier → utiliser `EmptyState` | page PDF individuelle pas encore rendue → utiliser `PageSkeleton`
 * @dontUseFor chargement de page entière → utiliser LoaderPage | squelette de dashboard → utiliser DashboardSkeleton
 * @example <LoadingState label="Chargement du contrat…" />
 */
'use client';

import { Loader2 } from 'lucide-react';

export function LoadingState({ label = 'Chargement du document…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
      <Loader2 className="w-8 h-8 animate-spin" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-16 text-sm text-gray-400">
      {message}
    </div>
  );
}

export function PageSkeleton({ width }: { width: number }) {
  return (
    <div
      className="bg-gray-100 animate-pulse rounded-md flex items-center justify-center"
      style={{ width, height: width * 1.4 }}
    >
      <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
    </div>
  );
}
