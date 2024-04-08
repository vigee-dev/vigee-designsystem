import React from "react";
import { Button } from "./Button";
import { PiUploadUpDuoSolid } from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";

interface DownloadButtonProps {
  onClick?: () => void;
  className?: string;
  text?: string;
}

export const UploadButton = ({
  onClick,
  className,
  text,
}: DownloadButtonProps) => {
  <Button onClick={onClick} variant="outline" className="text-gray-600">
    {text}
    <PiUploadUpDuoSolid
      className={cn(
        " text-gray-500 mx-2 hover:text-primary hover:cursor-pointer transform transition-ease-in-out",
        className
      )}
    />
  </Button>;
};
