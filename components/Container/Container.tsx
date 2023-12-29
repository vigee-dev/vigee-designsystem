import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: Props) {
  return (
    <div
      className={`bg-white flex flex-col border rounded-md shadow-sm  justify-center  mb-4 w-full  ${className}`}
    >
      {children}
    </div>
  );
}
