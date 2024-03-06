import React from "react";
import { Button } from "./Button";
import {
  PiCloudArrowDownloadStroke,
  PiDownloadDownDuoSolid,
} from "../../icons/PikaIcons";

interface DownloadButtonProps {
  onClick?: () => void;
  noText?: boolean;
}

const DownloadButton = ({ onClick, noText }: DownloadButtonProps) => {
  return noText ? (
    <PiDownloadDownDuoSolid className="w-4 h-4 text-gray-500 mx-2" />
  ) : (
    <Button onClick={onClick} variant="outline">
      Télécharger
      <PiCloudArrowDownloadStroke className="w-4 h-4 text-gray-500 mx-2" />
    </Button>
  );
};

export default DownloadButton;
