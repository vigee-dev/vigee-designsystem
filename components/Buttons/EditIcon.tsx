import React from "react";
import { PiPencilEditBoxStroke } from "../../icons/PikaIcons";
import { cn } from "../../lib/utils";
import Link from "next/link";

interface Props {
  onClick?: () => void;
  className?: string;
  href?: string;
}

export const EditIcon = ({ onClick, className, href }: Props) => {
  return href ? (
    <Link href={href}>
      <PiPencilEditBoxStroke
        className={cn(
          "text-primary-light hover:text-primary hover:cursor-pointer transform transition-ease-in-out duration-300 ease-in-out",
          className
        )}
      />
    </Link>
  ) : (
    <PiPencilEditBoxStroke
      className={cn(
        "text-primary-light hover:text-primary hover:cursor-pointer transform transition-ease-in-out duration-300 ease-in-out",
        className
      )}
      onClick={onClick}
    />
  );
};
