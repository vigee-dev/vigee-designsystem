/**
 * @description Conteneur blanc avec bordure arrondie pour regrouper visuellement un bloc de contenu dans une page Vigee.
 * @useWhen encapsuler une section de page (formulaire, liste, détails) → utiliser Container | créer une carte de contenu avec fond blanc et bords arrondis → utiliser Container | structurer verticalement des éléments enfants dans un bloc délimité → utiliser Container
 * @dontUseFor contenu nécessitant un padding/layout horizontal spécifique → utiliser LineContainer | contenu avec coins arrondis et styles avancés → utiliser RoundedContainer
 * @example <Container><p>Contenu de la section</p></Container>
 */
import { cn } from "../lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: Props) {
  return (
    <div
      className={cn(
        `bg-white flex flex-col border rounded-xl  justify-center  my-4 w-full`,
        className
      )}
    >
      {children}
    </div>
  );
}
