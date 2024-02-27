import React from "react";
import { PiDeleteDustbin01DuoStroke } from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";
import { Button } from "./Button";

interface Props {
  onClick?: () => void;
  className?: string;
}

export const DeleteButton = ({ onClick, className }: Props) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-full hover:bg-red-500 hover:text-white transformation ease-in-out duration-300",
        className
      )}
    >
      <PiDeleteDustbin01DuoStroke
        className={cn(
          "w-full hover:bg-red-500 hover:text-white transformation ease-in-out duration-300",
          className
        )}
        onClick={onClick}
      />
      Supprimer
    </Button>
  );
};
