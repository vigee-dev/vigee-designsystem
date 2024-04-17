import React from "react";
import { PiDeleteDustbin01DuoStroke } from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";
import { Button } from "./Button";

interface Props {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  noText?: boolean;
  fullWidth?: boolean;
}

export const DeleteButton = ({
  onClick,
  className,
  type = "button",
  noText,
  fullWidth = false,
}: Props) => {
  return (
    <Button
      type={type}
      variant="outline"
      className={cn(
        "flex text-gray-600 gap-x-4  hover:bg-red-500 hover:text-white transformation ease-in-out duration-300 bg-transparent border-none p-0",
        className,
        fullWidth && "w-full"
      )}
      onClick={onClick}
    >
      {!noText && <p>Supprimer</p>}
      <PiDeleteDustbin01DuoStroke
        className={cn("  transformation ease-in-out w-5 h-5")}
      />
    </Button>
  );
};
