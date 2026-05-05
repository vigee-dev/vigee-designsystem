/**
 * @description Menu déroulant contextuel avec support d'items cliquables, cases à cocher, séparateurs et labels de section.
 * @useWhen actions contextuelles sur une entité (éditer, supprimer, archiver) → passer un Button icon comme trigger | options de configuration rapide avec états cochés → utiliser items `item-checkbox` | regrouper des actions secondaires pour ne pas surcharger l'UI → remplacer plusieurs boutons isolés
 * @dontUseFor navigation principale entre pages → utiliser Sidebar | sélection d'une valeur dans un formulaire → utiliser Select ou ComboBox
 * @example <DropdownMenu trigger={<Button icon="more-horizontal" />} items={[{ type: 'item', content: 'Modifier', onClick: handleEdit }, { type: 'separator' }, { type: 'item', content: 'Supprimer', onClick: handleDelete, className: 'text-red-500' }]} />
 */
import {
  DropdownMenu as DropdownMenuPrimitive, DropdownMenuCheckboxItem,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { ReactNode } from "react";
import { cn } from "../lib/utils";

export type DropDownMenuItemType =
  | {
    type: 'item';
    content: string | ReactNode;
    onClick?: () => void;
    className?: string
  }
  | {
    type: 'item-checkbox'
    checked: boolean
    onCheckedChange?: (checked: boolean) => void
    content: string | ReactNode;
    onClick?: () => void;
    className?: string
  }
  | {
    type: 'separator';
  }
  | {
    type: 'sub-menu-label';
    content: string | ReactNode;
  };

interface Props {
  trigger: string | ReactNode;
  items: DropDownMenuItemType[],
  menuClassName?: string;
}

const DropdownMenu = ({ trigger, items, menuClassName }: Props) => {
  return (
    <DropdownMenuPrimitive>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className={cn('rounded-xl', menuClassName)}>
        {items.map((item, index) => {
          switch (item.type) {
            case 'item':
              return (
                <DropdownMenuItem className={cn(item.className, 'cursor-pointer')} key={index} onClick={item.onClick} asChild>
                  {typeof item.content === 'string' ? <p>{item.content}</p> : item.content}
                </DropdownMenuItem>
              )

            case 'item-checkbox':
              return (
                <DropdownMenuCheckboxItem
                  className={cn(item.className, 'cursor-pointer')}
                  checked={item.checked}
                  onCheckedChange={item.onCheckedChange}
                  key={index}
                  onClick={item.onClick}
                >
                  {item.content}
                </DropdownMenuCheckboxItem>
              )

            case 'sub-menu-label':
              return (
                <DropdownMenuLabel key={index}>
                  {item.content}
                </DropdownMenuLabel>
              )

            case 'separator':
              return <DropdownMenuSeparator key={index} />

            default:
              return null

          }
        })}
      </DropdownMenuContent>
    </DropdownMenuPrimitive>
  );
}

export default DropdownMenu;