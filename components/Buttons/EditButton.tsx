import React from "react";
import {
  PiPencilEditBoxContrast,
  PiPencilEditBoxDuoSolid,
} from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Tooltip } from "../Tooltip/Tooltip";
import { Button } from "./Button";

interface Props {
  onClick?: () => void;
  className?: string;
  href?: string;
  tooltip?: string;
  text?: string;
}

export const EditButton = ({
  onClick,
  className,
  href,
  tooltip = "Modifier",
  text,
}: Props) => {
  return href ? (
    <Tooltip message={tooltip}>
      <Link href={href}>
        <Button className="bg-transparent border-none p-0">
          {text}
          <PiPencilEditBoxContrast
            className={cn(
              " text-gray-500 mx-2 hover:text-primary hover:cursor-pointer transform transition-ease-in-out",
              className
            )}
          />
        </Button>
      </Link>
    </Tooltip>
  ) : (
    <Tooltip message={tooltip}>
      <Button className="bg-transparent border-none p-0">
        {text}
        <PiPencilEditBoxDuoSolid
          className={cn(
            " text-gray-500 mx-2 hover:text-primary hover:cursor-pointer transform transition-ease-in-out",
            className
          )}
          onClick={onClick}
        />
      </Button>
    </Tooltip>
  );
};
