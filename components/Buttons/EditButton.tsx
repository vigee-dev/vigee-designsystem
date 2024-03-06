import React from "react";
import { PiPencilEditBoxDuoSolid } from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Tooltip } from "../Tooltip/Tooltip";

interface Props {
  onClick?: () => void;
  className?: string;
  href?: string;
  tooltip?: string;
}

export const EditButton = ({
  onClick,
  className,
  href,
  tooltip = "Modifier",
}: Props) => {
  return href ? (
    <Tooltip message={tooltip}>
      <Link href={href}>
        <PiPencilEditBoxDuoSolid
          className={cn(
            " hover:text-primary hover:cursor-pointer transform transition-ease-in-out duration-300 ease-in-out w-5 h-5",
            className
          )}
        />
      </Link>
    </Tooltip>
  ) : (
    <Tooltip message={tooltip}>
      <PiPencilEditBoxDuoSolid
        className={cn(
          " hover:text-primary hover:cursor-pointer transform transition-ease-in-out duration-300 ease-in-out w-5 h-5",
          className
        )}
        onClick={onClick}
      />
    </Tooltip>
  );
};
