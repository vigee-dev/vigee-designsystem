import React from "react";
import { TypographyH1, TypographyH2 } from "../Typography/Typography";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  small?: boolean;
}

export function PageHeader({ title, children, small }: PageHeaderProps) {
  return (
    <div className=" rounded-md h-fit bg-white p-5  border mb-4 items-center ">
      <div className="flex flex-wrap justify-between  gap-x-4 w-full items-center ">
        {small ? (
          <TypographyH2>{title}</TypographyH2>
        ) : (
          <TypographyH1>{title}</TypographyH1>
        )}
        <div className="flex gap-x-4">{children}</div>
      </div>
    </div>
  );
}
