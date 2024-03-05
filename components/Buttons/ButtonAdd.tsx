import React from "react";
import { TypographyH2 } from "../Typography/Typography";
import { cn } from "../../lib/utils";

interface AddButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text: string;
  icon: React.ReactNode;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

const AddButton: React.FC<AddButtonProps> = ({
  text,
  icon,
  type,
  className,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={cn(
        `flex flex-col text-gray-400 items-center pt-2 hover:text-sky-600 transform ease-in-out duration-200 cursor-pointer `,
        className
      )}
      onClick={onClick}
    >
      {icon}
      <TypographyH2>{text}</TypographyH2>
    </button>
  );
};

export default AddButton;
