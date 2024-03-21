import React from "react";
import {
  PiPencilEditBoxContrast,
  PiPencilEditBoxDuoSolid,
  PiPencilEraserEditSwooshDuoStroke,
} from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Tooltip } from "../Tooltip/Tooltip";
import { Button } from "./Button";

interface Props {
  onClick?: () => void;
  className?: string;
  tooltip?: string;
  href?: string;
  text?: string;
}

export const SignatureElecButton = ({
  onClick,
  className,
  tooltip = "Envoyer en signature électronique",
  href,
  text,
}: Props) => {
  return href ? (
    <Tooltip message={tooltip}>
      <Link href={href} className="flex items-center gap-x-2">
        {text}
        <PiPencilEraserEditSwooshDuoStroke
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
        <PiPencilEraserEditSwooshDuoStroke
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
