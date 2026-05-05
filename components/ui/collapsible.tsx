/**
 * @description Primitives Radix UI pour créer une section affichable/masquable avec trigger et contenu animé.
 * @useWhen panneau de détails secondaires à masquer par défaut → utiliser Collapsible | FAQ ou accordéon simple à un seul item → utiliser Collapsible | zone de filtres avancés rétractable → utiliser Collapsible
 * @dontUseFor plusieurs sections accordéon imbriquées → utiliser Accordion | contenu dans un panneau latéral → utiliser Drawer
 * @example <Collapsible><CollapsibleTrigger>Voir plus</CollapsibleTrigger><CollapsibleContent>Contenu masqué</CollapsibleContent></Collapsible>
 */
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
