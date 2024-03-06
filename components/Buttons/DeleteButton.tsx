import React from "react";
import { PiDeleteDustbin01DuoStroke } from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";
import { Button } from "./Button";

interface Props {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const DeleteButton = ({
  onClick,
  className,
  type = "button",
}: Props) => {
  return (
    <Button
      type={type}
      variant="outline"
      className={cn(
        "flex text-gray-600 gap-x-4 w-full hover:bg-red-500 hover:text-white transformation ease-in-out duration-300",
        className
      )}
      onClick={onClick}
    >
      Supprimer
      <PiDeleteDustbin01DuoStroke
        className={cn(
          " hover:bg-red-500 hover:text-white transformation ease-in-out w-5 h-5",
          className
        )}
      />
    </Button>
  );
};
