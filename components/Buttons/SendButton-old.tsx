import React from "react";
import {
  PiEye02OnDuoStroke,
  PiSendPlaneHorizontalContrast,
  PiSendPlaneHorizontalDuoSolid,
  PiSendPlaneHorizontalSolid,
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
  disabled?: boolean;
}

export const SendButton = ({
  onClick,
  className,
  href,
  tooltip = "Envoyer",
  text,
  disabled,
}: Props) => {
  return href ? (
    <Tooltip message={tooltip}>
      <Link href={href} className="flex items-center gap-x-2">
        {text}
        <PiSendPlaneHorizontalContrast
          className={cn(
            "text-gray-400 hover:text-primary hover:cursor-pointer transform transition-ease-in-out duration-300 ease-in-out w-5 h-5",
            className
          )}
        />
      </Link>
    </Tooltip>
  ) : (
    <Tooltip message={tooltip}>
      <Button className="flex gap-2" disabled={disabled}>
        {text}
        <PiSendPlaneHorizontalContrast
          className={cn(
            "text-primary-foreground hover:text-primary hover:cursor-pointer transform transition-ease-in-out duration-300 ease-in-out w-5 h-5",
            className
          )}
          onClick={onClick}
        />
      </Button>
    </Tooltip>
  );
};
