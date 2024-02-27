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
        "flex text-gray-600 gap-x-4 w-full hover:bg-red-500 hover:text-white transformation ease-in-out duration-300",
        className
      )}
    >
      {" "}
      Supprimer
      <PiDeleteDustbin01DuoStroke
        className={cn(
          " hover:bg-red-500 hover:text-white transformation ease-in-out w-5 h-5",
          className
        )}
        onClick={onClick}
      />
    </Button>
  );
};
