import React from "react";
import { Button } from "./Button";
import {
  PiCloudArrowDownloadStroke,
  PiDownloadDownDuoSolid,
  PiUploadUpDuoSolid,
} from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";

interface DownloadButtonProps {
  onClick?: () => void;
  noText?: boolean;
  className?: string;
}

export const UploadButton = ({
  onClick,
  noText,
  className,
}: DownloadButtonProps) => {
  return noText ? (
    <PiUploadUpDuoSolid
      className={cn(
        " text-gray-500 mx-2 hover:text-primary hover:cursor-pointer transform transition-ease-in-out",
        className
      )}
    />
  ) : (
    <Button onClick={onClick} variant="outline">
      Uploader
      <PiUploadUpDuoSolid
        className={cn(
          " text-gray-500 mx-2 hover:text-primary hover:cursor-pointer transform transition-ease-in-out",
          className
        )}
      />
    </Button>
  );
};
