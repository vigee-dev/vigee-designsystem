import React from "react";
import { Button } from "./Button";
import { PiCloudArrowDownloadStroke } from "../../icons/pikaicons";

interface DownloadButtonProps {
  onClick?: () => void;
}

const DownloadButton = ({ onClick }: DownloadButtonProps) => {
  return (
    <Button onClick={() => {}} variant="outline">
      Télécharger
      <PiCloudArrowDownloadStroke className="w-6 h-6 text-gray-500 mx-2" />
    </Button>
  );
};

export default DownloadButton;
