import React from "react";
import { Button } from "./Button";
import {
  PiCloudArrowDownloadStroke,
  PiDownloadDownDuoSolid,
} from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";

interface DownloadButtonProps {
  onClick?: () => void;
  noText?: boolean;
  className?: string;
}

const DownloadButton = ({
  onClick,
  noText,
  className,
}: DownloadButtonProps) => {
  return noText ? (
    <PiDownloadDownDuoSolid className={cn(" text-gray-500 mx-2", className)} />
  ) : (
    <Button onClick={onClick} variant="outline">
      Télécharger
      <PiCloudArrowDownloadStroke
        className={cn(" text-gray-500 mx-2", className)}
      />
    </Button>
  );
};

export default DownloadButton;
