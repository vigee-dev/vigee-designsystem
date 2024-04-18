import React from "react";
import { PiEye02OnContrast, PiEye02OnDuoStroke } from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Tooltip } from "../Tooltip/Tooltip";
import { Button } from "./Button";

interface Props {
  onClick?: () => void;
  className?: string;
  href?: string;
  tooltip?: string;
}

export const SeeButton = ({
  onClick,
  className,
  href,
  tooltip = "Voir",
}: Props) => {
  return href ? (
    <Tooltip message={tooltip}>
      <Link href={href}>
        <PiEye02OnContrast
          className={cn(
            "text-gray-400 mx-2 hover:text-primary hover:cursor-pointer transform transition-ease-in-out",
            className
          )}
        />
      </Link>
    </Tooltip>
  ) : (
    <Tooltip message={tooltip}>
      <Button
        onClick={onClick}
        variant="outline"
        className="bg-transparent border-none p-0"
      >
        <PiEye02OnContrast
          className={cn(
            "text-gray-400 mx-2 hover:text-primary hover:cursor-pointer transform transition-ease-in-out",
            className
          )}
          onClick={onClick}
        />
      </Button>
    </Tooltip>
  );
};
