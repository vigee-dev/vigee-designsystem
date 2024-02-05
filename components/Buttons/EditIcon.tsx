import React from "react";
import { PiPencilEditBoxStroke } from "../../icons/PikaIcons";

interface Props {
  onClick?: () => void;
}

export const EditIcon = ({ onClick }: Props) => {
  return (
    <PiPencilEditBoxStroke className="text-primary-light hover:text-primary hover:cursor-pointer transform transition-ease-in-out duration-300 ease-in-out" />
  );
};
