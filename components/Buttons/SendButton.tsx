import React from "react";
import {
  PiEye02OnDuoStroke,
  PiSendPlaneHorizontalDuoSolid,
  PiSendPlaneHorizontalSolid,
} from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Tooltip } from "../Tooltip/Tooltip";

interface Props {
  onClick?: () => void;
  className?: string;
  href?: string;
  tooltip?: string;
  text?: string;
}

export const SendButton = ({
  onClick,
  className,
  href,
  tooltip = "Envoyer",
  text,
}: Props) => {
  return href ? (
    <Tooltip message={tooltip}>
      <Link href={href} className="flex items-center gap-x-2">
        {text}
        <PiSendPlaneHorizontalSolid
          className={cn(
            "text-gray-400 hover:text-primary hover:cursor-pointer transform transition-ease-in-out duration-300 ease-in-out w-5 h-5",
            className
          )}
        />
      </Link>
    </Tooltip>
  ) : (
    <Tooltip message={tooltip}>
      <div className="flex items-center gap-x-2">
        {text}
        <PiSendPlaneHorizontalSolid
          className={cn(
            "text-gray-400 hover:text-primary hover:cursor-pointer transform transition-ease-in-out duration-300 ease-in-out w-5 h-5",
            className
          )}
          onClick={onClick}
        />
      </div>
    </Tooltip>
  );
};
