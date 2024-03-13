import React from "react";
import { PiEye02OnContrast, PiEye02OnDuoStroke } from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Tooltip } from "../Tooltip/Tooltip";

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
            "text-gray-400 hover:text-primary hover:cursor-pointer transform transition-ease-in-out duration-300 ease-in-out w-6 h-6",
            className
          )}
        />
      </Link>
    </Tooltip>
  ) : (
    <Tooltip message={tooltip}>
      <PiEye02OnContrast
        className={cn(
          "text-gray-400 hover:text-primary hover:cursor-pointer transform transition-ease-in-out duration-300 ease-in-out w-6 h-6",
          className
        )}
        onClick={onClick}
      />
    </Tooltip>
  );
};
