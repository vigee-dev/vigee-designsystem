import React from "react";
import { PiDeleteDustbin01DuoStroke } from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";
import { Button } from "./Button";

interface Props {
  onClick?: () => void;
  className?: string;
}

export const DeleteIcon = ({ onClick, className }: Props) => {
  return (
    <Button variant="ghost" className="border-none">
      <PiDeleteDustbin01DuoStroke
        className={cn(
          "text-primary-light hover:text-red-600 hover:cursor-pointer transform transition-ease-in-out duration-300 ease-in-out",
          className
        )}
        onClick={onClick}
      />
    </Button>
  );
};
