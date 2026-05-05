/**
 * @description Section rétractable avec un déclencheur personnalisable pour masquer/afficher un contenu secondaire.
 * @useWhen filtres avancés à cacher par défaut → utiliser Collapsible | bloc de détails optionnels dans une fiche → utiliser Collapsible | contenu long à rendre progressif dans une page → utiliser Collapsible
 * @dontUseFor navigation entre vues → utiliser TabsResponsive | contenu dans une modale latérale → utiliser Drawer | liste d'items tous indépendamment rétractables → utiliser Accordion
 * @example <Collapsible trigger={<Button icon="chevron-down" />} className="w-full">Contenu masqué</Collapsible>
 */
import {
  Collapsible as CollapsibleWrapper,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useState } from "react";

interface CollapsibleProps {
  defaultOpen?: boolean;
  className: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
}

const Collapsible = ({
  trigger,
  children,
  className,
  defaultOpen = false,
}: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <CollapsibleWrapper
      open={isOpen}
      onOpenChange={setIsOpen}
      className={className}
    >
      <CollapsibleTrigger asChild>
        <div>{trigger}</div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">{children}</CollapsibleContent>
    </CollapsibleWrapper>
  );
};

export default Collapsible;
