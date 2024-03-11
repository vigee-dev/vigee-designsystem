import React from "react";
import { TypographyH1, TypographyH2 } from "../Typography/Typography";
import { cn } from "../../lib/utils";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  small?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  children,
  small,
  icon,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "rounded-xl h-fit bg-white p-5  border items-center mb-4",
        className
      )}
    >
      <div className="flex flex-wrap justify-between  gap-x-4 w-full items-center ">
        <div className="flex items-center gap-4 ">
          {icon}
          {small ? (
            <TypographyH2>{title}</TypographyH2>
          ) : (
            <TypographyH1>{title}</TypographyH1>
          )}
        </div>
        <div className="flex gap-x-4">{children}</div>
      </div>
    </div>
  );
}
