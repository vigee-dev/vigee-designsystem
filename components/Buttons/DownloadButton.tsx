import React from "react";
import { Button } from "./Button";
import {
  PiCloudArrowDownloadStroke,
  PiDownloadDownDuoSolid,
} from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";
import { Tooltip } from "../Tooltip/Tooltip";

interface DownloadButtonProps {
  onClick?: () => void;
  noText?: boolean;
  className?: string;
  tooltip?: string;
}

export const DownloadButton = ({
  onClick,
  noText,
  className,
  tooltip = "Télécharger",
}: DownloadButtonProps) => {
  return noText ? (
    <Tooltip message={tooltip}>
      <PiDownloadDownDuoSolid
        className={cn(
          " text-gray-500 mx-2 hover:text-primary hover:cursor-pointer transform transition-ease-in-out",
          className
        )}
      />
    </Tooltip>
  ) : (
    <Tooltip message={tooltip}>
      <Button onClick={onClick} variant="outline">
        Télécharger
        <PiCloudArrowDownloadStroke
          className={cn(
            " text-gray-500 mx-2 hover:text-primary hover:cursor-pointer transform transition-ease-in-out",
            className
          )}
        />
      </Button>
    </Tooltip>
  );
};
