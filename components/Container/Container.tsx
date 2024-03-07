import React from "react";
import { cn } from "../../lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: Props) {
  return (
    <div
      className={cn(
        `bg-white flex flex-col border rounded-md  justify-center  mb-4 w-full`,
        className
      )}
    >
      {children}
    </div>
  );
}
