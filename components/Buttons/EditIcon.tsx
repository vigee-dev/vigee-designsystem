import React from "react";
import { PiPencilEditBoxStroke } from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";

interface Props {
  onClick?: () => void;
  className?: string;
}

export const EditIcon = ({ onClick, className }: Props) => {
  return (
    <PiPencilEditBoxStroke
      className={cn(
        "text-primary-light hover:text-primary hover:cursor-pointer transform transition-ease-in-out duration-300 ease-in-out",
        className
      )}
      onClick={onClick}
    />
  );
};