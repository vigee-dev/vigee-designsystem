/**
 * @description Garde conditionnel qui affiche loading / erreur / vide ou le contenu réel selon l'état d'un fetch.
 * @useWhen affichage d'une liste ou table après un appel API → wrapper le contenu avec ContentGuard | données potentiellement vides → passer isEmpty pour afficher EmptyIllustration | erreur de fetch → passer isError pour afficher Error | skeleton personnalisé nécessaire → passer LoadingComponent
 * @dontUseFor protection par rôle ou permission → utiliser Unauthorized | affichage d'une alerte non bloquante → utiliser AlertInfo
 * @example <ContentGuard isLoading={isLoading} isError={isError} isEmpty={!data?.length}><DataTable data={data} /></ContentGuard>
 */
import EmptyIllustration from "../Illustration/EmptyIllustration";
import { ComponentType, ReactNode, ReactElement } from "react";
import { Error } from "../Errors/Error";
import { TableSkeleton } from "../Skeletons/Skeletons";

type ContentGuardProps = {
  children: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  LoadingComponent?: ReactElement | ComponentType;
  ErrorComponent?: ReactElement | ComponentType;
  EmptyComponent?: ReactElement | ComponentType;
}

export function ContentGuard({
  children,
  isLoading = false,
  isError = false,
  isEmpty = false,
  LoadingComponent = <TableSkeleton />,
  ErrorComponent = <Error />,
  EmptyComponent = <EmptyIllustration />,
}: ContentGuardProps) {
  if (isLoading) {
    return typeof LoadingComponent === 'function' ? <LoadingComponent /> : LoadingComponent;
  }

  if (isError) {
    return typeof ErrorComponent === 'function' ? <ErrorComponent /> : ErrorComponent;
  }

  if (isEmpty) return typeof EmptyComponent === 'function' ? <EmptyComponent /> : EmptyComponent;

  return children;
}