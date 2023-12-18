import React from "react";
import { TypographyH1 } from "../Typography/Typography";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className=" rounded-md h-fit bg-white p-5  border mb-4">
      <div className="flex flex-wrap justify-between  gap-x-4 w-full items-center ">
        <TypographyH1>{title}</TypographyH1>
        <div className="flex gap-x-4">{children}</div>
      </div>
    </div>
  );
}
