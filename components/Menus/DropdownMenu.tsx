import {
  DropdownMenu as DropdownMenuPrimitive,
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
                <DropdownMenuItem key={index} onClick={item.onClick} asChild>
                  {item.content}
                </DropdownMenuItem>
              );
            case 'sub-menu-label':
              return (
                <DropdownMenuLabel key={index}>
                  {item.content}
                </DropdownMenuLabel>
              );
            case 'separator':
              return <DropdownMenuSeparator key={index} />;
            default:
              return null;
          }
        })}
      </DropdownMenuContent>
    </DropdownMenuPrimitive>
  );
}

export default DropdownMenu;