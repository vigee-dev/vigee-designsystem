import React from "react";
import { TypographyH1, TypographyH2 } from "../Typography/Typography";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  small?: boolean;
  icon?: React.ReactNode;
}

export function PageHeader({ title, children, small, icon }: PageHeaderProps) {
  return (
    <div className=" rounded-md h-fit bg-white p-5  border mb-4 items-center ">
      <div className="flex flex-wrap justify-between  gap-x-4 w-full items-center ">
        <div className="flex items-center gap-4 ">
          {" "}
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
