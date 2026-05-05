/**
 * @description Enveloppe n'importe quel élément pour lui ajouter une infobulle texte au survol.
 * @useWhen icône sans libellé (Button, action) → wrapper avec Tooltip pour expliciter l'action | cellule de tableau tronquée → afficher le contenu complet | badge ou KPI → apporter un contexte supplémentaire
 * @dontUseFor contenu riche ou interactif dans la bulle → utiliser HoverCard | message d'erreur de formulaire → utiliser le système de validation du Form
 * @example <Tooltip message="Supprimer l'élément"><Button icon="trash" onClick={handleDelete} /></Tooltip>
 */
import {
  TooltipProvider,
  Tooltip as TootltipShad,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";

interface TooltipProps {
  message: string;
  children: React.ReactNode;
}

export function Tooltip({ message, children }: TooltipProps) {
  return (
    <div className="relative">
      <TooltipProvider>
        <TootltipShad>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent>
            <p>{message}</p>
          </TooltipContent>
        </TootltipShad>
      </TooltipProvider>
    </div>
  );
}
