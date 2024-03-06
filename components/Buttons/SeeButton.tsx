import React from "react";
import { Button } from "./Button";
import {
  PiCloudArrowDownloadStroke,
  PiDownloadDownDuoSolid,
  PiUploadUpDuoSolid,
} from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";
import { PiEyedropperDuotone } from "react-icons/pi";

interface DownloadButtonProps {
  onClick?: () => void;
  noText?: boolean;
  className?: string;
}

const SeeButton = ({ onClick, noText, className }: DownloadButtonProps) => {
  return noText ? (
    <PiEyedropperDuotone
      className={cn(
        " text-gray-500 mx-2 hover:text-primary hover:cursor-pointer transform transition-ease-in-out",
        className
      )}
    />
  ) : (
    <Button onClick={onClick} variant="outline">
      Uploader
      <PiEyedropperDuotone
        className={cn(
          " text-gray-500 mx-2 hover:text-primary hover:cursor-pointer transform transition-ease-in-out",
          className
        )}
      />
    </Button>
  );
};

export default SeeButton;
