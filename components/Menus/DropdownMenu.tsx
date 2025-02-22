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